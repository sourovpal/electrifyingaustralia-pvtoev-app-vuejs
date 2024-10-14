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

export const leadImageTypes = [
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
  if (ext) {
    return ext;
  }
  return null;
};

export const handleDownloadFile = async (url, $filename) => {
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

export const fetchImage = async (url, callback = null) => {
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

export function handleDateTimeFormat(
  timestamp,
  format = "YYYY-MM-DD HH:mm:ss"
) {
  if (!timestamp) return;
  return moment(timestamp).format(format);
}

export function formatTimeAgo(
  dateInput,
  showDate = 30,
  format = "Do MMMM, YYYY HH:mm a"
) {
  if (!dateInput) return;
  let date = moment(dateInput);
  if (moment().diff(date, "days") > showDate && showDate) {
    return date.format(format);
  } else {
    return date.fromNow();
  }
}

export async function delay(interval = 100) {
  await new Promise((m) => setTimeout(m, interval));
}

export const getCustomPropertieIcon = (type) => {
  if (type == "free_text") {
    return "far fa-pen-to-square";
  } else if (type == "multiline_free_text") {
    return "fas fa-bars";
  } else if (type == "yes_or_no") {
    return "far fa-thumbs-up";
  } else if (type == "date") {
    return "far fa-calendar-check";
  } else if (type == "date_and_time") {
    return "far fa-clock";
  } else if (type == "single_choice") {
    return "fas fa-list-check";
  } else if (type == "multiple_choice") {
    return "fas fa-list";
  } else if (type == "real_number") {
    return "fas fa-plus-minus";
  } else if (type == "read_only") {
    return "fas fa-book-open-reader";
  }
  return "";
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
