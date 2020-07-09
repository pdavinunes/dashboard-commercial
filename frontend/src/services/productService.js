import createService from "./genericService";

const service = createService("/products");

export default {
    index(){
        return service.get('');
    },

    show(id) {
        return service.get(`/${id}`);
    },

    create(body) {
        return service.post('', body)
    },

    update(id, body) {
        return service.put(`/${id}`, body);
    },

    delete(id) {
        return service.delete(`/${id}`);
    }

}