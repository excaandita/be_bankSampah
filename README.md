# be_bankSampah
Postman : https://documenter.getpostman.com/view/25359891/2s93mBvyZp#ef743602-27b1-4fd1-8811-b5cb6060174c 

MongoDB : /db_bankSampah

Fitur API Bank Sampah

1. User
    - fullname
    - username
    - email
    - password
    - address
    - phone_number
    - group_id (id_group_user)
    - status
2. Category
    - name
    - description
3. Garbage
    - name
    - category (id_category)
    - price -> 3 (Toni, Apk, Jual)
    - status (enable, disable)
4. Transaction
    - date
    - username (id_user)
    - garbage_name (id_garbage)
    - qty
    - total_price
5. Group User
    - name

AUTH
    - 1. isLoginUser : digunakan untuk validasi melalui token yang dimana role user == 'User' dan digunakan di router untuk hak akses User
    - 2. isLoginAdmin : digunakan untuk validasi melalui token yang dimana role user == 'Admin' dan digunakan di router untuk hak akses Admin
    - 3. isLogin : User tercatat di session.userLogin sehingga dapat login

Routes : 
1. AUTH
    - url/api/v1/auth/login -> digunakan untuk login (Add Session & create Token)
    - url/api/v1/auth/logout -> digunakan untuk logout (Delete Session)

2. USER
    - url/api/v1/user/list -> digunakan untuk menampilkan list user (isLogin)
    - ~~~~~~~~~~/user/create -> digunakan untuk menambahkan user (isLogin, isLoginAdmin)
    - ~~~~~~~~~~~~~~~/get/:id -> digunakan untuk menampilkan user berdasarkan id (isLogin)
    - ~~~~~~~~~~~~~~~/edit/:id -> digunakan untuk merubah user berdasarkan id (isLogin, isLoginAdmin)
    - ~~~~~~~~~~~~~~~/delete/:id -> digunakan untuk menghapus user berdasarkan id (isLogin, isLoginAdmin)

3. CATEGORY
    - url/api/v1/category/list -> digunakan untuk menampilkan list category
    - ~~~~~~~~~~/category/create -> digunakan untuk menambahkan category (isLogin, isLoginUser)
    - ~~~~~~~~~~~~~~~/get/:id -> digunakan untuk menampilkan category berdasarkan id
    - ~~~~~~~~~~~~~~~/edit/:id -> digunakan untuk merubah category berdasarkan id (isLogin, isLoginUser)
    - ~~~~~~~~~~~~~~~/delete/:id -> digunakan untuk menghapus category berdasarkan id (isLogin, isLoginUser)