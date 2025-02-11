export class Service {

    getList = (request) => {
        let key = request.key;
        return request.list.filter(item => item[key] == request.value)
      }
}

export const service = new Service();

export default service;
