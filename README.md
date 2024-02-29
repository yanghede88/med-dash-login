## Instructions for Running the Website Locally
If you haven't install Node.js in your computer,please download it from the following url:<br>
[Node.js](https://nodejs.org/en/download)

1. Open your terminal<br> 
2. Navigate to the main directory by typing the following command:<br>
```cd med-dash-login```
3. Install the necessary dependencies:<br>
```npm install```<br>
```pip install -r requirements.txt```<br>
4. Run the following command to fetch data:<br>
```python pull_mongodb_data.py```<br>
```pyhton process_vital_data.py analysis```<br>
5. Start the backend server:<br>
```npm run dev```
6. After starting the frontend server, you will see the URL of the local host displayed in the terminal.<br>
7. Copy and paste this URL into your web browser's address bar.<br>
8. You should now be able to access and interact with the login system locally in your browser.
9. As for now, the username and password is fixed. Please use ```13800000002``` for username and ```246810``` for the password.
