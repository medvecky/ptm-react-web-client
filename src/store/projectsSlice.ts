import {createSlice} from '@reduxjs/toolkit';

export const projectsSlice = createSlice(
    {
        name: 'projects',
        initialState: {
            projects: [],
            filter: ''
        },
        reducers: {
            setProjects: (state, action) => {
                state.projects = action.payload;
            },

            setProjectsFilter: (state, action) => {
                state.filter = action.payload;
            },

            clearProjectFilter: state => {
                state.filter = '';
            }
        }
    }
);

export const {setProjects, setProjectsFilter, clearProjectFilter} = projectsSlice.actions;

// @ts-ignore
export const selectProjectsProjects = state => state.projects.projects;
// @ts-ignore
export const selectProjectsFilter = state => state.projects.filter;

export default projectsSlice.reducer;
