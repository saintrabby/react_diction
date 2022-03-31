import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./firebase";


const LOAD = 'dic/LOAD';
const CREATE = 'dic/CREATE';
const CHECK = 'dic/CHECK';
const UPDATE = 'dic/UPDATE';
const REMOVE = 'dic/REMOVE';



const initialState = {
    list: []
}



export function loadDic(dic) {
    return { type: LOAD, dic }
}

export function addDic(dic) {
    return { type: CREATE, dic }
}

export function checkDic(dic) {
    return { type: CHECK, dic }
}

export function updateDic(dic) {
    return { type: UPDATE, dic }
}

export function removeDic(dic) {
    return { type: REMOVE, dic }
}





export const loadDicFB = () => {
    return async function (dispatch) {

        const fbData = await getDocs(collection(db, 'mydicts'))

        const new_arr = fbData.docs.map((v) => {
            const new_dic = { ...v.data(), id: v.id }

            return new_dic
        })

        new_arr.sort((a, b) => a.index - b.index)

        dispatch(loadDic(new_arr))
    }
}

export const addDicFB = (dic) => {
    return async function (dispatch) {

        addDoc(collection(db, 'mydicts'), dic)

        dispatch(addDic(dic))
    }
}

export const checkDicFB = (dic) => {
    return async function (dispatch) {

        const docRef = await doc(db, 'mydicts', dic.id)
        updateDoc(docRef, { check: !dic.check })

        dispatch(checkDic(dic))
    }
}

export const updateDicFB = (dic) => {
    return async function (dispatch) {

        const docRef = await doc(db, 'mydicts', dic.id)

        updateDoc(docRef, {
            name: dic.name,
            desc: dic.desc,
            exam: dic.exam
        })

        dispatch(updateDic(dic))
    }
}

export const removeDicFB = (dic) => {
    return async function (dispatch) {

        const docRef = await doc(db, 'mydicts', dic.id)

        deleteDoc(docRef)

        dispatch(removeDic(dic))
    }
}



export default function reducer(state = initialState, action = {}) {
    switch (action.type) {

        case LOAD: {

            const new_list = action.dic
            return { list: new_list }
        }

        case CREATE: {

            let new_dic = {
                name: action.dic.name,
                desc: action.dic.desc,
                exam: action.dic.exam,
                check: action.dic.check,
                index: action.dic.index
            }
            const new_list = [...state.list, new_dic]

            return { list: new_list }
        }

        case CHECK: {

            const new_list = state.list.map((v) => {
                if (v.index == action.dic.index) {
                    let new_dic = {
                        ...v, check: !v.check
                    }
                    return new_dic
                }
                return v
            })

            return { list: new_list }
        }

        case UPDATE: {

            const new_list = state.list.map((v) => {
                if (v.index == action.dic.index) {
                    let new_dic = {
                        ...v,
                        name: action.dic.name,
                        desc: action.dic.desc,
                        exam: action.dic.exam
                    }
                    return new_dic
                }
                else
                    return v
            })

            return { list: new_list }
        }

        case REMOVE: {

            const new_list = state.list.filter((v) => {
                return v.index != action.dic.index
            })

            return { list: new_list }
        }
        default: return state
    }
}