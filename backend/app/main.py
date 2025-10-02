from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .rephrase import router as rephrase_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(rephrase_router, prefix="/api")

@app.get("/health")
async def health_check():
    return {"status": "ok"}