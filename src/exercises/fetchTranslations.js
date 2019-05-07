import api from "../api";

const fetchTranslations = ids =>
    Promise.all(
        ids.map(id => api.get(`/translation/${id}`))
    )

export default fetchTranslations