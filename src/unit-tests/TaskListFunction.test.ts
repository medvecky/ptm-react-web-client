import {filterTasks} from "../components/TasksList/TaskListFunction";
import {TaskStatus} from "../task.status.enum";

describe('TaskListFunction', () => {

    it('should return [] if tasks list empty', () => {
        const result = filterTasks([], '','');
        expect(result).toEqual([]);
    });

    it('should return task corresponding status filter', () => {
        const tasks = [
            {
                id: 'id_01',
                title: 'title_01',
                description: 'desc_01',
                status: 'OPEN'
            },
            {
                id: 'id_02',
                title: 'title_02',
                description: 'desc_02',
                status: 'DONE'
            }
        ];
        // @ts-ignore
        const result = filterTasks(tasks, '','OPEN');
        expect(result).toEqual([
            {
                id: 'id_01',
                title: 'title_01',
                description: 'desc_01',
                status: 'OPEN'
            }
        ]);
    });

    it('should return task corresponding project filter', () => {
        const tasks = [
            {
                id: 'id_01',
                title: 'title_01',
                description: 'desc_01',
                status: 'OPEN'
            },
            {
                id: 'id_02',
                title: 'title_02',
                description: 'desc_02',
                status: 'OPEN',
                projectId: 'xxx'
            },
            {
                id: 'id_03',
                title: 'title_03',
                description: 'desc_03',
                status: 'OPEN',
                projectId: 'yyy'
            },
            {
                id: 'id_04',
                title: 'title_04',
                description: 'desc_04',
                status: 'DONE'
            }
        ];
        // @ts-ignore
        const result = filterTasks(tasks, 'xxx','OPEN');
        expect(result).toEqual([
            {
                id: 'id_02',
                title: 'title_02',
                description: 'desc_02',
                status: 'OPEN',
                projectId: 'xxx'
            }
        ]);
    });

    it('should return task corresponding project filter "-"', () => {
        const tasks = [
            {
                id: 'id_01',
                title: 'title_01',
                description: 'desc_01',
                status: 'OPEN'
            },
            {
                id: 'id_02',
                title: 'title_02',
                description: 'desc_02',
                status: 'OPEN',
                projectId: 'xxx'
            },
            {
                id: 'id_03',
                title: 'title_03',
                description: 'desc_03',
                status: 'OPEN',
                projectId: 'yyy'
            },
            {
                id: 'id_04',
                title: 'title_04',
                description: 'desc_04',
                status: 'DONE'
            }
        ];
        // @ts-ignore
        const result = filterTasks(tasks, '-','OPEN');
        expect(result).toEqual([
            {
                id: 'id_01',
                title: 'title_01',
                description: 'desc_01',
                status: 'OPEN'
            }
        ]);
    })
});