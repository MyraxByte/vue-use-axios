const axios = require("axios");
const { reactive } = require("vue");

module.exports.useAxios = (url, options) => {
  const state = reactive({
    url,
    payload: null,
    requested: false,
    finished: false,
    canceled: false,
    errorMessage: null,
  });

  const instance = () => axios.create(options);
  const request = async (addUrl, method, form) => {
    const url = addUrl ? `${state.url}/${addUrl}`.replace(/(?<!:)\/\/+/g, "/") : state.url;

    state.payload = null;
    state.finished = false;
    state.canceled = false;
    state.errorMessage = null;
    state.requested = true;

    try {
      const response = await instance()[method](url, form);
      state.payload = response.data;
      state.finished = true;
    } catch (e) {
      state.canceled = true;
      state.errorMessage = e.message;
      state.payload = e.response.data;
    } finally {
      state.requested = false;
    }
  };

  return {
    instance: instance(),
    state,
    get: () => request(null, "get"),
    post: (form) => request(null, "post", form),
    put: (url, form) => request(url, "put", form),
    delete: (url) => request(url, "delete"),
    patch: (url, form) => request(url, "patch", form),
  };
};