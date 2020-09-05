import {configureStore} from '@reduxjs/toolkit';
import systemReducer from './systemSlice'
import tasksReducer from './tasksSlice'
import projectsReducer from './projectsSlice'

export default configureStore({
        reducer: {
            system: systemReducer,
            tasks: tasksReducer,
            projects: projectsReducer
        },
    }
);