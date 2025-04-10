# 🏗️ CAD Block Extractor – Backend

### LIVE LINK==> https://zero3-cad-project.onrender.com/

This is the backend for the CAD Block Extractor project. It allows users to upload CAD (DXF) files, extract block data, and store metadata in a PostgreSQL database. Files are stored in Cloudinary, and block data is searchable and paginated.

---

## 📦 Tech Stack

- **Node.js** + **Express.js**
- **PostgreSQL** (via Prisma)
- **Cloudinary** for file storage
- **Multer** for handling file uploads
- **DXF-Parser** for parsing `.dxf` files

---

## 🛠️ Installation & Setup

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/cad-block-extractor-backend.git
cd cad-block-extractor-backend

```

##.ENV.EXAMPLE has cloudinary and database url example sample for env

## BACKEND==> ROOT:NPM RUN DEV

## FRONTEND==> CLIENT:NPM RUN DEV

complete now the project is done
go to the server folder in the github i create the endpoints with response
this project has global error handling in the backend

### API ENDPOINT:

1.  UPLOAD CONTROLLER

         1. endpoint==> http://localhost:5000/api/cad/upload
         2. body=key=file type=file value=filename.dxf
            3.res==>
            {
            "message": "File uploaded and blocks extracted successfully.",
            "fileUrl": "https://res.cloudinary.com/dp4flnvvw/raw/upload/v1744219361/puvsy7sextflxyvyhrtb.dxf",
            "totalBlocks": 2
            }

2.  GET ALL THE BLOCKS

         1.endpoint==> http://localhost:5000/api/block

         2.res==>
         {
         "data": [
         {
         "id": "cc850923-ce09-4eed-9a74-69ac1927eab4",
         "name": "\*MODEL_SPACE",
         "baseX": 0,
         "baseY": 0,
         "fileId": "cee4eba3-6356-4702-9ed3-95370afd1f12",
         "file": {
         "id": "cee4eba3-6356-4702-9ed3-95370afd1f12",
         "name": "m1d5qlok.dxf",
         "url": "https://res.cloudinary.com/dp4flnvvw/raw/upload/v1744152234/xbtpavmi4ertfcbogk7n.dxf",
         "uploadedAt": "2025-04-08T22:43:55.372Z"
         }
         },
         .....
         ],
         "pagination": {
         "total": 21,
         "page": 1,
         "pages": 3
         }
         }

3.GET BLOCK BY ID

      1.  ENDPOINT ==> http://localhost:5000/api/block/cc850923-ce09-4eed-9a74-69ac1927eab4

      2.  RES==>
         {
         "id": "cc850923-ce09-4eed-9a74-69ac1927eab4",
         "name": "\*MODEL_SPACE",
         "baseX": 0,
         "baseY": 0,
         "fileId": "cee4eba3-6356-4702-9ed3-95370afd1f12",
         "file": {
         "id": "cee4eba3-6356-4702-9ed3-95370afd1f12",
         "name": "m1d5qlok.dxf",
         "url": "https://res.cloudinary.com/dp4flnvvw/raw/upload/v1744152234/xbtpavmi4ertfcbogk7n.dxf",
         "uploadedAt": "2025-04-08T22:43:55.372Z"
         }
         }

4.  SEARCH BY NAME AND TYPE

         1. ENDPOINT==>http://localhost:5000/api/block/search?name=\*PAPER_SPACE

         2.RES==>
         [
         {
         "id": "cec3bdc1-2c5d-4636-ad3f-46f9d00690b9",
         "name": "*PAPER_SPACE",
         "baseX": 0,
         "baseY": 0,
         "fileId": "1358e8c6-fb16-4dd2-818b-baf91cff0c32"
         },
         {
         "id": "37ae073b-257c-4707-8dbe-c43e1d8fe8ef",
         "name": "*PAPER_SPACE",
         "baseX": 0,
         "baseY": 0,
         "fileId": "04982213-e6c6-482f-a774-6742ddf7852f"
         },
         ]
