import {TaskStatus} from "./task.status.enum";

export interface EditTaskDto {
    id: string;
    title: string;
    description: string;
    projectId: string;
    status: string;
}