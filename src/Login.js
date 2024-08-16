import React from 'react'
import { useRef, useState, useEffect } from 'react';

export default function Login() {

    const input_ID = useRef();
    const input_pass = useRef();

    // 계정이 저장된 DB 주소
    const url = "http://localhost:8080/login"

    // 계정 토큰값
    let token = "";

    // ID와 password 오브젝트
    const postData = {
        userid: "",
        password: ""
    }
    const loadBoard = async (e) => {
        e.preventDefault();
        
        postData.userid = input_ID.current.value;
        postData.password = input_pass.current.value;
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(postData)
        })
            .then(resp => {
                if (resp.status == 200) {
                    token = resp.headers.get("Authorization")
                    console.log(token)
                    return JSON.stringify(resp)
                }
                else return;
            }).then(result => {
                console.log(result);
            }).catch(error => {
                console.error('Error fetching Login:', error);
            });
    };


    return (
        <form>
            <div >
                <input type="id" id="userid" ref={input_ID} />
                <label for="userid">Email address</label>
            </div>

            <div >
                <input type="password" id="password" ref={input_pass} />
                <label for="password">Password</label>
            </div>
            <button type="button" onClick={loadBoard}>Sign in</button>
        </form>
    )
}
