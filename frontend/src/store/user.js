import {create} from 'zustand'
import {devtools} from 'zustand/middleware'
import {persist,createJSONStorage} from 'zustand/middleware';

export const userStore = create(devtools(persist(((set) => ({
    userInfo: {
        token: false
    },
    logout: () => {
        set(state => ({
            ...state,
            userInfo: {
                ...state.userInfo,
                token: false
            }
        }));
    },
    login: (token) => {
        set(state => ({
            ...state,
            userInfo: {
                ...state.userInfo,
                token: token
            }
        }));

        setTimeout(() => {set(state => ({
            ...state,
            userInfo: {
                ...state.userInfo,
                token: false
            }
        }))}, 3 * 60 * 60 * 1000)
    },
})), {
    name: 'userStorage', // unique name
    storage:createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
})))




