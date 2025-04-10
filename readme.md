# 🏗️ CAD Block Extractor – Backend

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

for running server in the root directory run: npm run dev

for running client:
    -- go to the client folder and run
    --npm run dev
```

in the env.example
add cloudinary and database url

complete now the project is done
go to the server folder in the github i create the endpoints with response
this porject has global error handling in the backend
