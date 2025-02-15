import authFetch from '../../../service/index';
const createTaskApi = async (data:any)=>{
    try {
        const res = await authFetch.post("/api/task/create",data)
        return res
    } catch (err) {
        console.log(err);
    }
}
const getTaskApi = async ()=>{
    try {
        const res = await authFetch.get("/api/task/getTasks")
        return res
    } catch (err) {
        console.log(err);
    }
}

const editTaskApi = async (data)=>{
    try {
        const res = await authFetch.put("/api/task/editTask",data)
        return res
    } catch (err) {
        console.log(err);
    }
}
const deleteTaskApi = async (id)=>{
    try {
        const res = await authFetch.delete(`/api/task/deleteTask/${id}`)
        return res
    } catch (err) {
        console.log(err);
    }
}
const editStatusApi = async (data)=>{
    
    try {
        const res = await authFetch.patch(`/api/task/editStatus`,data)
        return res
    } catch (err) {
        console.log(err);
    }
}
const editTasksStatusApi = async (data)=>{
    
    try {
        const res = await authFetch.patch(`/api/task/editTasksStatus`,data)
        return res
    } catch (err) {
        console.log(err);
    }
}
const deleteTasksApi = async (data)=>{
    
    try {
        const res = await authFetch.patch(`/api/task/deleteTasks`,data)
        return res
    } catch (err) {
        console.log(err);
    }
}

const editTaskDragApi = async (id,data)=>{
    
    try {
        const res = await authFetch.patch(`/api/task/edit/${id}`,data)
        return res
    } catch (err) {
        console.log(err);
    }
}


export{createTaskApi,getTaskApi,editTaskApi,deleteTaskApi,editStatusApi,editTasksStatusApi,deleteTasksApi,editTaskDragApi }