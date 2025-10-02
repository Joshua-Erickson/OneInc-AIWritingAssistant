from fastapi import APIRouter, Request
from fastapi.responses import StreamingResponse
from .hf_client import callModel
import re

router = APIRouter()

def format_chunks(chunks):
    for chunk in chunks:
        yield chunk


@router.post("/rephrase")
async def rephrase(request: Request):
    payload = await request.json()
    text = payload.get("text", "").strip()

    if not text:
        return {"error": "No text provided"}
    
    return StreamingResponse(format_chunks(callModel(text)), media_type="text/plain")