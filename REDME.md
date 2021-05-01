## User bcrypt

A library to help you hash passwords.

```bash
  npm install
  npm start  
```

### create hash password
```bash

const salt = async bcrypt.salt(10); #default value is 10  
const hashedPass = async bcrypt.hash(newUserPasswordHere, salt);  

# or shorthand
const hashedPass = async bcrypt.hash(newUserPasswordHere, 10);  

```

### compare password for login user
```bash

const hashedPass = async bcrypt.compare(passFromUser, passFromDB);  #(normalPass, bcryptPass)

```