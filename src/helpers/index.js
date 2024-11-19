import api from "@actions/api";
import moment from "moment";

export async function mergeTimelineLogs(oldData, newData, latest = false) {
  for (let date in newData) {
    if (!oldData[date]) {
      oldData = { ...oldData, [date]: [...newData[date]] };
    } else {
      if (latest) {
        newData[date].map((item) => {
          var index = oldData[date].findIndex(
            (o) => o.timeline_id == item.timeline_id
          );
          if (index > -1) {
            oldData[date][index] = item;
          } else {
            oldData[date].push(item);
          }
        });
      } else {
        oldData = { ...oldData, [date]: newData[date].concat(oldData[date]) };
      }
    }
  }

  return Object.keys(oldData)
    .sort()
    .reduce((acc, currValue) => {
      acc[currValue] = oldData[currValue];
      return acc;
    }, {});
}

export function shortenFileName(fileName, maxLength) {

  if (!fileName) return;

  if (fileName?.length < maxLength) return fileName;

  const extension = fileName.split(".").pop();
  const baseName = fileName.slice(0, -(extension.length + 1));

  if (baseName.length > maxLength) {
    const partLength = Math.floor((maxLength - 3) / 2);
    const firstPart = baseName.slice(0, partLength);
    const secondPart = baseName.slice(-partLength);
    return firstPart + "..." + secondPart + "." + extension;
  } else {
    return fileName;
  }
}

export const imageExtensions = [
  "png",
  "jpg",
  "jpeg",
  "webp",
  "bmp",
  "tiff",
  "svg",
  "gif",
];

export const fileNameToExtension = (fileName) => {
  var ext = fileName.split(".").pop().toLowerCase();
  if (ext) return ext;
  return null;
};

export function getFileObjectUrl(file) {
  if (file instanceof File) {
    return URL.createObjectURL(file);
  }
  throw new Error("Input must be a File object");
}

export const handleDownloadAttachmentFiles = async (url, $filename) => {
  await api({
    url,
    method: "GET",
    responseType: "blob",
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", $filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    })
    .catch((error) => {
      console.error("File download failed", error);
    });
};

export const fetchFile = async (url, callback = null) => {
  return await api({
    url,
    method: "GET",
    responseType: "blob",
  })
    .then(async (response) => {
      let url = await URL.createObjectURL(response.data);
      if (callback) {
        return callback(url);
      }
      return url;
    })
    .catch((error) => {
      console.log(error);
      return callback(false, error);
    });
};

export function handleDateTimeFormat(timestamp, format = "YYYY-MM-DD HH:mm:ss") {
  if (!timestamp) return;
  return moment(timestamp).format(format)?.toString();
}

export function formatTimeAgo(
  dateInput,
  showDate = 30,
  format = "Do MMMM, YYYY HH:mm a",
) {
  if (!dateInput) return;
  let date = moment(dateInput);
  if (moment().diff(date, "days") > showDate && showDate) {
    return date.format(format);
  } else {
    return date.fromNow();
  }
}

export function timeDifference(date1, date2) {
  // Create moment objects
  if (!date1 || !date2) return;
  const moment1 = moment(date1);
  const moment2 = moment(date2);

  // Get differences
  const years = moment2.diff(moment1, "years");
  if (years > 0) return `${years} year${years > 1 ? "s" : ""}`;

  const months = moment2.diff(moment1, "months");
  if (months > 0) return `${months} month${months > 1 ? "s" : ""}`;

  const weeks = moment2.diff(moment1, "weeks");
  if (weeks > 0) return `${weeks} week${weeks > 1 ? "s" : ""}`;

  const days = moment2.diff(moment1, "days");
  if (days > 0) return `${days} day${days > 1 ? "s" : ""}`;

  const hours = moment2.diff(moment1, "hours");
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""}`;

  const minutes = moment2.diff(moment1, "minutes");
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""}`;

  const seconds = moment2.diff(moment1, "seconds");
  return ` 1＜min`;
}

export async function delay(interval = 100) {
  await new Promise((m) => setTimeout(m, interval));
}

export const getCustomPropertieIcon = (type) => {
  if (type == "free_text") return 'pi pi-pen-to-square';
  else if (type == "multiline_free_text") return "pi pi-align-left";
  else if (type == "yes_or_no") return "pi pi-thumbs-up";
  else if (type == "date") return "pi pi-calendar-plus";
  else if (type == "date_and_time") return "pi pi-calendar-clock";
  else if (type == "single_choice") return "pi pi-check-square";
  else if (type == "multiple_choice") return "pi pi-list-check";
  else if (type == "real_number") return "pi pi-sort-numeric-up";
  else if (type == "read_only") return "pi pi-info-circle";
  else return "";
};

export function generateSlug(text = "", separator = "-") {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, separator)
    .replace(new RegExp(`\\${separator}+`, "g"), separator)
    .replace(/^-+|-+$/g, "");
}

export function formatLeadAddress($lead, defaultTitle = null) {
  if (!$lead) return;
  let output = "";
  const { address_line_one, address_line_two, city, state, post_code } = $lead;

  if (address_line_one && !address_line_two) {
    output += address_line_one;
  } else if (!address_line_one && address_line_two) {
    output += address_line_two;
  } else if (address_line_one && address_line_two) {
    output += address_line_one + "/" + address_line_two;
  }

  if (output != "" && (city || state || post_code)) {
    output += ", ";
  }

  output += `${city ?? ""} ${state ?? ""} ${post_code ?? ""}`;
  output = output?.trim();
  if (output != "") {
    return output;
  } else if (defaultTitle) {
    return defaultTitle;
  } else {
    return null;
  }
}

export function validateObject(payload) {
  if (
    typeof payload == "object" &&
    payload != null &&
    !Array.isArray(payload)
  ) {
    return true;
  }
  return false;
}



export function formatFileSize(bytes) {
  const k = 1024;
  const dm = 2;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  if (bytes === 0) {
    return `0 ${sizes[0]}`;
  }

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

  return `${formattedSize} ${sizes[i]}`;
}


export function getPropertieValue(propertie, lead) {

  const { properties_values } = lead;

  if (!properties_values) return "—";

  let attrType = propertie.data_type_id;

  let attrValue = properties_values[propertie.unique_id];

  if ((attrType === "free_text" || attrType === "multiline_free_text") && attrValue) {

    if (attrValue.length > 20)
      return `<div class="text-overflow-ellipsis w-100 hover-scroll">${attrValue}</div>`;

    return `<span class="text-overflow-ellipsis w-100">${attrValue}</span>`;

  } else if ((attrType === "date" || attrType === "date_and_time") && attrValue) {

    return attrValue;

  } else if (attrType === "single_choice" && attrValue) {

    return `<span class="text-overflow-ellipsis w-100">${attrValue?.value}</span>`;

  } else if (attrType === "multiple_choice" && attrValue?.length && Array.isArray(attrValue)) {

    return `<span class="text-overflow-ellipsis w-100">
      ${attrValue?.map(item => item.value).join(', ')}
    </span>`;

  } else if (attrType === "yes_or_no" && attrValue) {

    return `<span class="text-overflow-ellipsis w-100 text-capitalize">${attrValue}</span>`;

  } else if (attrType === "real_number" && typeof attrValue != "undefined") {

    return `<span class="text-overflow-ellipsis w-100 text-capitalize">${attrValue}</span>`;

  }

  return "—";
}
