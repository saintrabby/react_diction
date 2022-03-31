import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'

import store from './configStore'
import { updateDicFB } from './rdxmod'

export default function ReWrite(props) {

    const nav = useNavigate()

    const dispatch = useDispatch()
    
    let nameref = useRef()
    let descref = useRef()
    let examref = useRef()

    const rdxData = store.getState().storedic.list
    
    onkeydown = (e) => (e.key == 'Enter' ? rewrite() : null)

    const param = useParams()

    function rewrite() {
        let new_data = rdxData.filter((v)=>{
            return v.index == param.index
        })

        let new_dic = {
            name: nameref.current.value,
            desc: descref.current.value,
            exam: examref.current.value,
            check: new_data[0].check,
            index: parseInt(param.index),
            id: new_data[0].id
        }

        dispatch(updateDicFB(new_dic))
        nav('/')
    }

    function goBack() {
        nav('/')
    }

    return (
        <Wrap>
            <CardBox>
                <OldData>
                    {rdxData.map((v, i) => {
                        if (v.index == param.index) {
                            return (
                                <div key={i}>
                                    <DonDon>현재단어 : {v.name}</DonDon>
                                    <DonDon>현재해석 : {v.desc}</DonDon>
                                    <DonDon>현재예시 : {v.exam}</DonDon>
                                </div>
                            )
                        }
                    })}
                </OldData>
                <Inputs>
                    <DonDon>바꿀단어</DonDon><Input ref={nameref} type='text' maxlength='25'></Input>
                    <DonDon>바꿀해석</DonDon><Input ref={descref} type='text' maxlength='25'></Input>
                    <DonDon>바꿀예시</DonDon><Input ref={examref} type='text' maxlength='25'></Input>
                </Inputs>
                <ButtonSet>
                    <New_btn onClick={rewrite}>수정</New_btn>
                    <New_btn onClick={goBack}>취소</New_btn>
                </ButtonSet>
            </CardBox>
        </Wrap>
    )
}




const Wrap = styled.div`
    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;
`


const CardBox = styled.div`
    width: 400px;
    height: 700px;
    
    margin-top: 100px;
    border-radius: 20px;
    background-color: #6b6;

    display: flex;
    flex-direction: column;
`



const OldData = styled.div`
    width: 300px;
    height: 130px;
    font-size: 18px;
    color: gray;
    background-color: #9d9;
    border-radius: 20px;

    margin: 20px auto;
`


const DonDon = styled.p`
    font-size: 18px;
`


const Inputs = styled.div`
    display: flex;
    flex-direction: column;

    align-items: center;
    /* margin-top: 0px; */
`


const Input = styled.input`
    width: 300px;
    height: 50px;
    font-size: 24px;
    border-radius: 20px;
    border: 0px;
    text-align: center;
    
    
    :focus { outline: none; }
`



const ButtonSet = styled.div`
    display: flex;
    flex-direction: row;

    justify-content: center;
`


const New_btn = styled.button`
    width: 80px;
    height: 80px;
    border-radius: 50px;
    border: 0px;
    margin: 40px 30px;
    font-size: 20px;
`