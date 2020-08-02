import {EditTaskDto} from "../../edit-task.dto";
import {Task} from "../../task.model";
import {TaskStatus} from "../../task.status.enum";

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
        // @ts-ignore
        task.status = TaskStatus[editTaskDto.status];
    }
}