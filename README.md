# To do list

## מטרה

```
אפליקציה לניהול משימות.
האפליקציה כוללת פתיחת משימה, עדכון משימה, ראיית כל המשימות וסגירת המשימות שהושלמו.
האפליקציה שומרת את המשימות עבור כל משתמש שנרשם בנפרד.
לכל משימה יש תאריך מתי היא צריכה להיעשות, אפשר לסנן רשימות לפי התאריך שלהןולפי הסטטוס שלהם
```

### mission = איך נראית משימה

| feild      | goal                              |
| ---------- | --------------------------------- |
| id         | מזהה                              |
| title      | כותרת המשימה                      |
| desc       | תיאור המשימה                      |
| date       | תאריך עד מתי המשימה צריכה להיעשות |
| finished   | האם המשימה הושלמה, TRUE OR FALSE  |
| created_at | מתי המשימה נוצרה                  |
| user_id    | מזהה המשתמש שאחראי על אותה משימה  |

---

### user = איך נראה משתמש

| feild    | goal         |
| -------- | ------------ |
| id       | מזהה         |
| name     | שם המשתמש    |
| email    | כתובת מייל   |
| password | סיסמה מוצפנת |

---

## endpoints

### users

| method | url        | goal                                           | response                    |
| ------ | ---------- | ---------------------------------------------- | --------------------------- |
| post   | /users     | יצירת משתמש                                    | {success: true,data: user}  |
| put    | /users/:id | עדכון פרטי משתמש ספציפי                        | {success: true,data: user}  |
| get    | /users     | קבלת נתוני משתמש ספציפי על ידי שם משתמש וסיסמה | {success: true, data: user} |

---

### missions

| method | url           | goal                                    | response                         |
| ------ | ------------- | --------------------------------------- | -------------------------------- |
| post   | /missions     | יצירת משימה                             | {success: true, data: mission}   |
| put    | /missions/:id | עדכון פרטי משימה ספציפית                | {success: true, data: mission}   |
| get    | /missions     | קבלת נתוני כל המשימות עם אפשרויות סינון | {success: true, data: mission[]} |

---

## DB

```
נשתמש בדאטאבייס מסוג SQL
למה?
1. כי זה מתאים למבנה, אין רשימות או מילונים בנתונים
2. יש קשר בין הטבלאות: כל משימה קשורה למשתמש
```

## frontend

נשתמש בREACT-VITE כי זה מה שאני כרגע מכיר וזה אחלה.

## mainLayout

- header
- outlet

### header

- params: None
- context: user_name
- מציג: כותרת "המשימות של {user_name}"
- סרגל מעבר בין פרטי המשתמש לדף המשימות
- כפתור logout שיוצא ומעביר לעמוד login

## pages

### login

קומפונטטות:

- login-form
- מחזיק כפתור מעבר להרשמה

### login-form

- params: None
- fetch: get/users?
- input: שם משתמש וסיסמה
- במקרה של הצלחה מעביר לדף המשימות. במקרה של שגיאה, מציג שגיאה

### register

קומפונטטות:

- register-form

### register-form

- params: None
- fetch: post/users
- input: name, email, password
- בהצלחה מעביר לדף המשימות. בשגיאה מציג שגיאה

### user_details

מורכב מ

- user_card
- עם יכולת לעדכן פרטים

### user-card

- params: None
- context: user
- fetc: לעדכון פרטי המשתמש
- מציג:
- את כל פרטי המשתמש
- כפתור לעדכון
- אין אפשרות למחוק user

### missions

מורכב מ:

- missions-list
- filter_by_data
- filter_by_status
- כפתור + שפותח קומפוננטת new_mission

### mission-card

- params: mission
- מציג את כותרת המשימה, את התיאור שלה, את התאריך שנוצרה, את הסטטוס שלה, ואת התאריך שצריך לסיים אותה
- btns:
- update: מעבר לעדכון פרטי המשימה
- close: סגירת המשימה

### missions-list

- context: user_id
- fetch: מקבל את נתוני המשימות של המשתמש
- מציג:
- רשימה של mission-cards
- sorted by date => מי שהתאריך שלו הכי קרוב יהיה ראשון, מי שהתאריך שלו הכי רחוק יהיה אחרון וכו'

### filter_by_date
- params: None
- store: mission.filter, missions.display_missions
- input: date
- משנה את display_missions

### filter_by_status
- params: None
- store: mission.filter, missions.display_missions
- input: open/closed
- משנה את display_missions



### new-mission

- params: None
- fetch: post/missions
- context: user_id
- input: title, desc, date

## store

### mission-store

- missions_list
- display_missions
- add_mission
- update_mission
- close_mission
- filter
