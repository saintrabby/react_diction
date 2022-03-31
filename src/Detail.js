import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { addDicFB } from './rdxmod';



export default function Write() {

    const param = useParams()

    let nameref = useRef()
    let descref = useRef()
    let examref = useRef()

    let dispatch = useDispatch()

    let nav = useNavigate();

    onkeydown = (e) => (e.key == 'Enter' ? okEvent() : null)

    function goBack() {
        nav('/')
    }

    function okEvent() {
        
        let dic = {
            name: nameref.current.value,
            desc: descref.current.value,
            exam: examref.current.value,
            check: false,
            index: parseInt(param.index)
        }

        dispatch(addDicFB(dic))
        nav('/')
    }

    return (
        <Wrap>
            <CardBox>
                <Inputs>
                    <DonDon>단어</DonDon><Input ref={nameref} onChange={()=>{
                        if (nameref.current.value.length >= 25) { nameref.current.value = nameref.current.value.slice(0, 25) }
                    }}></Input>
                    <DonDon>해석</DonDon><Input ref={descref} onChange={()=>{
                        if (descref.current.value.length >= 25) { descref.current.value = descref.current.value.slice(0, 25) }
                    }}></Input>
                    <DonDon>예시</DonDon><Input ref={examref} onChange={()=>{
                        if (examref.current.value.length >= 25) { examref.current.value = examref.current.value.slice(0, 25) }
                    }}></Input>
                </Inputs>

                <ButtonSet>
                    <New_btn onClick={okEvent}>추가</New_btn>
                    <New_btn onClick={goBack}>취소</New_btn>
                </ButtonSet>
            </CardBox>
        </Wrap>
    )
}







const Wrap = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 100px;

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
    margin: 100px 30px;
    font-size: 20px;
`


const Inputs = styled.div`
    display: flex;
    flex-direction: column;

    align-items: center;
    margin-top: 50px;
`

const DonDon = styled.p`
    font-size: 20px;
`

const Input = styled.input`
    width: 300px;
    height: 50px;
    font-size: 20px;
    border-radius: 20px;
    border: 0px;
    text-align: center;
    :focus { outline: none; }
`
