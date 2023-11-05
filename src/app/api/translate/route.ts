import { NextResponse } from "next/server";
import axios from "axios";


export async function POST(req: Request, res: Response) {

    const {target, source, sentence} = await req.json();

    const encodedParams = new URLSearchParams();
    encodedParams.set('q', sentence);
    encodedParams.set('target', 'sk');
    encodedParams.set('source', 'en');

    const options = {
        method: 'POST',
        url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': 'e7dfe1b381msh302f46b832f4c22p1454b6jsnd332d6cccdee',
            'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
        },
        data: encodedParams,
    };

    try {
        const response = await axios.request(options);
        return NextResponse.json(response.data)
    } catch (error) {
        console.error(error);
    }
    
}