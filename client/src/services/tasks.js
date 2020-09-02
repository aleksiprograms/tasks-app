import axios from 'axios';

const getAll = async () => {
    const response = await axios.get('/tasks');
    return response.data;
}

const create = async (task) => {
    const response = await axios.post('/tasks', task);
    return response.data;
}

const update = async (task) => {
    const response = await axios.put(`${'/tasks'}/${task._id}`, task);
    return response.data;
}

const remove = async (id) => {
    const response = await axios.delete(`${'/tasks'}/${id}`);
    return response.data;
}

export default { getAll, create, update, remove };