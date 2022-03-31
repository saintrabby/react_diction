import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { checkDicFB, removeDicFB } from './rdxmod'



export default function Card({ rData }) {

    const dispatch = useDispatch()

    let nav = useNavigate()

    function deleteEvent() {
        dispatch(removeDicFB(rData))
    }

    function re_write() {
        nav('/rewrite/' + rData.index)
    }

    function checkEvent() {
        dispatch(checkDicFB(rData))
    }

    const onRemove = () => {
        if (window.confirm("정말 삭제할까요?")) {
            deleteEvent()
        }
    };

    return (
        <CardBox check={rData.check}>
            <Btns>
                <Btn onClick={onRemove}>X</Btn>
                <Btn onClick={re_write}>/</Btn>
                <Btn onClick={checkEvent}>V</Btn>
            </Btns>
            <Desk>
                <DeskLine>단어 : {rData.name}</DeskLine>
                <DeskLine>설명 : {rData.desc}</DeskLine>
                <DeskLine><span style={{ color: '#33f' }}>예시 : {rData.exam}</span></DeskLine>
            </Desk>
        </CardBox>
    )
}




const CardBox = styled.div`
    width: 400px;
    height: 300px;
    margin: 20px;
    border-radius: 20px;

    background-color: ${(props) => (props.check == false ? '#6b6' : '#676')};

`

const Btns = styled.div`
    display: flex;
    flex-direction: row-reverse;
`

const Btn = styled.button`
    width: 30px;
    height: 30px;
    margin: 10px;
    border: 0px;
    border-radius: 20px;
    
    background-color: #282;

    float: right;
`

const Desk = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    float: left;
    font-size: 24px;
`

const DeskLine = styled.div`
    margin: 20px;
    text-align: left;
`