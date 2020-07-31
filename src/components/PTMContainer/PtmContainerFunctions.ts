import {EditTaskDto} from "../../edit-task.dto";
import {Task} from "../../task.model";

export function updateTaskValues(editTaskDto: EditTaskDto, task: Task) {
    if (editTaskDto.title) {
        task.title = editTaskDto.title;
    }

    if (editTaskDto.description) {
        task.description = editTaskDto.description;
    }

    if (editTaskDto.projectId) {
        task.projectId = editTaskDto.projectId;
    }

    if (editTaskDto.status) {
        task.status = editTaskDto.status;
    }
}