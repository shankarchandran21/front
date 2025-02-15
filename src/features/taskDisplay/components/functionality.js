import { deleteTaskApi } from "../api";
export const formatDueDate = (dueDate) => {
    const today = new Date();
    const taskDate = new Date(dueDate.year, dueDate.month, dueDate.day); // No need to subtract 1
    // Normalize both dates to ignore time differences
    const isToday = taskDate.getDate() === today.getDate() &&
        taskDate.getMonth() === today.getMonth() &&
        taskDate.getFullYear() === today.getFullYear();
    if (isToday) {
        return "Today";
    }
    return `${dueDate.day} ${taskDate.toLocaleString("en-US", { month: "short" })}, ${dueDate.year}`;
};
export const handleDeleteTask = async (taskId, setTasks, setAnchorElEditDelete) => {
    setTasks((prevTasks) => {
        let sectionToUpdate = '';
        let updatedTasks = { ...prevTasks };
        // Find the section that contains the task
        for (const section in prevTasks) {
            const taskIndex = prevTasks[section].findIndex((task) => task.id === taskId);
            if (taskIndex !== -1) {
                sectionToUpdate = section;
                updatedTasks[section] = prevTasks[section].filter((task) => task.id !== taskId);
                break;
            }
        }
        if (!sectionToUpdate) {
            console.error(`Task with ID ${taskId} not found in any section.`);
            return prevTasks;
        }
        return updatedTasks;
    });
    await deleteTaskApi(taskId);
    setAnchorElEditDelete({ anchor: null, id: null });
};
