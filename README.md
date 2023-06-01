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
