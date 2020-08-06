import {Task} from "../../task.model";

export function filterTasks(tasks: Task [], projectFilter: string, statusFilter: string) {

    let result;

    if (projectFilter) {
        if (projectFilter === '-') {
            result = tasks
                .filter(task => task.status === statusFilter)
                .filter(task => task.projectId === "");
        } else {
            result = tasks
                .filter(task => task.status === statusFilter)
                .filter(task => task.projectId === projectFilter);
        }
    } else {
        result = tasks.filter(task => task.status === statusFilter);
    }
    return result;
}