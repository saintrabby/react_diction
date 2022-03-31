import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import Card from './Card'
import { loadDicFB } from './rdxmod'

export default function Home() {

    const rdxData = useSelector((sel) => sel.storedic.list)

    const dispatch = useDispatch()

    const nav = useNavigate()

    function goWrite() {
        let iarr = rdxData.map((v) => {
            return (v.index)
        })

        if (iarr.length === 0)
            iarr = [0]
        else
            iarr.sort((a, b) => b - a)

        nav('/write/' + (parseInt(iarr[0]) + 1))
    }

    useEffect(() => {
        dispatch(loadDicFB())
    }, [])

    return (
        <CardContainer>
            {rdxData.map((v, i) => {
                return <Card key={i} rData={v} />
            })}
            <AddCard onClick={goWrite} />
        </CardContainer>
    )
}





const CardContainer = styled.div`
    min-height: 100vh;
    padding-top: 160px;
    align-items: center;
    justify-content: center;
    
    
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

const AddCard = styled.button`
    width: 50px;
    height: 50px;
    position: fixed;
    border: 1px solid #eaa;
    background-color: #eaa;
    border-radius: 30px;
    
    right: 0px;
    bottom: 0px;
    margin: 20px;
`
