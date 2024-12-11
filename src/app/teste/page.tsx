'use client'
import { useEffect, useState } from "react"

export default function Home(){

    const [comment, setComment] = useState<any>([]);
    const [comments, setComments] = useState<any>([]);

    useEffect(() => {
        console.log('Initial comments state: ', comments);
        obterComments()
    }, [])

    async function obterComments() {
        try {
            const resp = await fetch('http://localhost:3001/comments');
            const comments = await resp.json();
            console.log(comments); 
            setComments(comments);
        } catch (error) {
            console.error("Error fetching comments: ", error);
            setComments([]); 
        }
    }
    
    async function criarComment(){
        const resp = await fetch('http://localhost:3001/comments', {
            method: 'POST', 
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(comment)
        })
        setComment({})
        const comments = await resp.json()
        setComments(comments)
    }


    function renderizarFormComments(){
        return(
            <>
                <div>
                    <label htmlFor="userID"> userID </label>
                    <input 
                        id="userID" 
                        type="number" 
                        value={comment.userID ?? ''} 
                        onChange={(e) => setComment({ ...comment, userID: e.target.value })} 
                    />
                </div>
                <div>
                    <label htmlFor="avalID"> avalID </label>
                    <input 
                        id="avalID" 
                        type="number" 
                        value={comment.avalID ?? ''} 
                        onChange={(e) => setComment({ ...comment, avalID: +e.target.value })} 
                    />
                </div>
                <div>
                    <label htmlFor="conteudo"> conteudo </label>
                    <input 
                        id="conteudo" 
                        type="text" 
                        value={comment.conteudo ?? ''} 
                        onChange={(e) => setComment({ ...comment, conteudo: e.target.value })} 
                    />
                </div>
                <div>
                    <button onClick={criarComment}> Salvar </button>
                </div>
            </>
        )
    }

    function renderizarComments(){
        return (
            <div>
                {Array.isArray(comments) && comments.map((comments: any)=> (
                    <div key ={comments.id} >
                        <p>{comments.userID}</p>
                        <p>{comments.avalID}</p> 
                        <p>{comments.conteudo}</p>     
                    </div>
                ))}
            </div>
        )
    }

    return(
        <div>
            {renderizarFormComments()}
            {renderizarComments()}
        </div>
    )
}