import {EditTaskDto} from "../../edit-task.dto";
import {Task} from "../../task.model";
import {TaskStatus} from "../../task.status.enum";
import {EditProjectDto} from "../../edit-project.dto";
import {Project} from "../../project.model";

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

export function updateProjectValues(editProjectDto: EditProjectDto, project: Project) {
    if (editProjectDto.title) {
        project.title = editProjectDto.title;
    }

    if (editProjectDto.description) {
        project.description = editProjectDto.description;
    }
}