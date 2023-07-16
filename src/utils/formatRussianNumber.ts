export function formatRussianNumber(phoneValue: string) {
  let formattedPhoneNumber = "";
  if (phoneValue.length <= 11) {
    if (phoneValue[0] === "9") {
      phoneValue = "7" + phoneValue;
    }
    const firstSymbols = phoneValue[0] === "8" ? "8" : "+7";
    formattedPhoneNumber = firstSymbols + " ";

    if (phoneValue.length > 1) {
      formattedPhoneNumber += "(" + phoneValue.substring(1, 4);
    }

    if (phoneValue.length >= 5) {
      formattedPhoneNumber += ") " + phoneValue.substring(4, 7);
    }

    if (phoneValue.length >= 8) {
      formattedPhoneNumber += "-" + phoneValue.substring(7, 9);
    }

    if (phoneValue.length >= 10) {
      formattedPhoneNumber += "-" + phoneValue.substring(9, 11);
    }
    return formattedPhoneNumber;
  }
  return false;
}
