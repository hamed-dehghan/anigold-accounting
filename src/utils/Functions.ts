import moment from 'jalali-moment';

export function updateClock() {
    const now = new Date();
  
    // Helper function to convert English digits to Persian
    const toPersianDigits = (num:any) =>
      num.replace(/\d/g, (digit:any) => '۰۱۲۳۴۵۶۷۸۹'[digit]);
  
    // Format time (HH:mm:ss)
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    // Convert time and date to Persian
    const persianHours = toPersianDigits(hours);
    const persianMinutes = toPersianDigits(minutes);
    const persianSeconds = toPersianDigits(seconds);
  
    // Get the Persian date using moment.js
    const persianDate = toPersianDigits(
      moment(now).locale('fa').format('YYYY/MM/DD')
    );
  
    // Display the time
    console.log(`Time: ${persianHours}:${persianMinutes}:${persianSeconds}`);
  
    return {
      hours: persianHours,
      minutes: persianMinutes,
      seconds: persianSeconds,
      date: persianDate,
    };
  }
  
