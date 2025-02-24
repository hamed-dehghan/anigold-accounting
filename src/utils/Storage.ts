
export const addressType_List = [
    { label: "منزل", value: "0" },
    { label: "محل کار", value: "1" },
    { label: "سایر موارد", value: "2" },
  ];
//   به این صورت :
// 1-مشتری2-کارمند3-ازمایشگاه

// اگر مشتری انتخاب شد اونوقت یه لیست دیگه هم نشون بدید 
// 1-اب شده فروش
// 2-همکار3-بنکدار4-مشتری معمولی

export const roles_List = [
  { 
    "id": 1, 
    "name": "مشتری",
    children:[
      { "id": 1, "name": "آب شده فروش" },
      { "id": 2, "name": "همکار" },
      { "id": 3, "name": "بنکدار" },
      { "id": 4, "name": "مشتری معمولی" }
    ] 
  },
  { "id": 2, "name": "کارمند" },
  { "id": 3, "name": "آزمایشگاه" }
]
export const banks_List = [
    { label: "اقتصاد نوین", value: "0" },
      { label: "ایران زمین", value: "1" },
      { label: "آینده", value: "2" },
      { label: "پارسیان", value: "3" },
      { label: "پاسارگاد", value: "4" },
      { label: "پست بانک ایران", value: "5" },
      { label: "تجارت", value: "6" },
      { label: "توسعه تعاون", value: "7" },
      { label: "خاورمیانه", value: "8" },
      { label: "دی", value: "9" },
      { label: "رسالت", value: "10" },
      { label: "رفاه کارگران", value: "11" },
      { label: "سامان", value: "12" },
      { label: "سپه", value: "13" },
      { label: "سرمایه", value: "14" },
      { label: "سینا", value: "15" },
      { label: "شهر", value: "16" },
      { label: "صادرات", value: "17" },
      { label: "صنعت و معدن", value: "18" },
      { label: "قوامین", value: "19" },
      { label: "کارآفرین", value: "20" },
      { label: "کشاورزی", value: "21" },
      { label: "گردشگری", value: "22" },
      { label: "مسکن", value: "23" },
      { label: "ملت", value: "24" },
      { label: "ملی ایران", value: "25" },
      { label: "مهر ایران", value: "26" },
  ]
  
export const accountType_List = [
    { label: "پس انداز", value: "0" },
    { label: "جاری", value: "1" },
    { label: "قرض الحسنه", value: "2" },
  ]
  
export const guaranteeType_List = [
    { label: "چک", value: "0" },
    { label: "سفته", value: "1" },
    { label: "سند", value: "2" },
  ]
  
export const creditType_List =[
    { label: "ریالی", value: "rial" },
  ]

export const dataTable :any= [
  {
    "name":"ali",
    "customerTypeId": 1,
    "zoneId": 101,
    "fullName": "علی رضایی",
    "nationalId": "۰۰۳۲۴۵۶۷۸۹",
    "code": 12345,
    "referral": "کد_معرف_۱۲۳",
    "image": {
      "fileDetails": "تصویر_پروفایل_علی_رضایی.jpg",
      "fileType": 1
    },
    "roles": [2],
    "addresses": [
      {
        "addressTypeId": 201,
        "addressLine": "تهران، خیابان انقلاب، کوچه ۱۲، پلاک ۵",
        "zipCode": "۱۱۱۳۴۵۶۷۸۹"
      }
    ],
    "phoneNumbers": [
      {
        "phoneNumberTypeId": 301,
        "number": "۰۹۱۲۱۲۳۴۵۶۷"
      }
    ],
    "appDates": [
      {
        "appDateTypeId": 401,
        "date": "2024-12-19T06:02:26.273Z"
      }
    ],
    "bankAccounts": [
      {
        "branchId": 501,
        "cardNumber": "۶۰۳۷۹۹۷۱۲۳۴۵۶۷۸۹",
        "accountNumber": "۱۲۳۴۵۶۷۸۹۰۱۱",
        "shabaNumber": "IR۱۲۳۴۵۰۰۰۱۰۰۰۱۲۳۴۵۶۷۸۹۰۱",
        "isCurrency": true
      }
    ],
    "guarantees": [
      {
        "guaranteeTypeId": 601,
        "name": "چک_حسن_انجام_کار",
        "amount": "۵۰۰۰۰۰۰"
      }
    ]
  },
  {
    "name":"amir",
    "customerTypeId": 2,
    "zoneId": 102,
    "fullName": "محمد احمدی",
    "nationalId": "۰۰۴۵۶۷۸۹۰۱",
    "code": 12346,
    "referral": "کد_معرف_۱۲۴",
    "image": {
      "fileDetails": "تصویر_پروفایل_محمد_احمدی.png",
      "fileType": 2
    },
    "roles": [1],
    "addresses": [
      {
        "addressTypeId": 202,
        "addressLine": "مشهد، خیابان آزادی، پلاک ۱۰",
        "zipCode": "۹۳۴۵۶۷۸۹۰۱"
      }
    ],
    "phoneNumbers": [
      {
        "phoneNumberTypeId": 302,
        "number": "۰۹۱۳۲۱۴۵۶۷۸"
      }
    ],
    "appDates": [
      {
        "appDateTypeId": 402,
        "date": "2024-12-18T08:00:00.000Z"
      }
    ],
    "bankAccounts": [
      {
        "branchId": 502,
        "cardNumber": "۶۰۳۷۹۹۷۶۵۴۳۲۱۸۹۰",
        "accountNumber": "۹۸۷۶۵۴۳۲۱۰۱۱",
        "shabaNumber": "IR۶۵۴۳۲۱۰۰۱۰۰۰۹۸۷۶۵۴۳۲۱۰۱۱",
        "isCurrency": false
      }
    ],
    "guarantees": [
      {
        "guaranteeTypeId": 602,
        "name": "سفته",
        "amount": "۷۰۰۰۰۰۰"
      }
    ]
  },
  {
    "name":"amir",
    "customerTypeId": 3,
    "zoneId": 103,
    "fullName": "زهرا مرادی",
    "nationalId": "۰۰۵۶۷۸۹۰۱۲",
    "code": 12347,
    "referral": "کد_معرف_۱۲۵",
    "image": {
      "fileDetails": "تصویر_پروفایل_زهرا_مرادی.jpg",
      "fileType": 1
    },
    "roles": [3],
    "addresses": [
      {
        "addressTypeId": 203,
        "addressLine": "شیراز، خیابان ملاصدرا، کوچه ۴",
        "zipCode": "۸۶۷۸۹۰۱۲۳۴"
      }
    ],
    "phoneNumbers": [
      {
        "phoneNumberTypeId": 303,
        "number": "۰۹۱۴۱۲۳۴۵۶۷"
      }
    ],
    "appDates": [
      {
        "appDateTypeId": 403,
        "date": "2024-12-17T14:30:00.000Z"
      }
    ],
    "bankAccounts": [
      {
        "branchId": 503,
        "cardNumber": "۶۰۳۷۹۹۷۶۸۹۰۱۲۳۴۵",
        "accountNumber": "۷۶۵۴۳۲۱۰۱۱۱",
        "shabaNumber": "IR۷۶۵۴۳۲۱۰۱۰۰۰۷۶۵۴۳۲۱۰۱۱۱",
        "isCurrency": true
      }
    ],
    "guarantees": [
      {
        "guaranteeTypeId": 603,
        "name": "چک تضمینی",
        "amount": "۹۰۰۰۰۰۰"
      }
    ]
  },

]

export const options : any = [{ value: '1', label: 'test' }];