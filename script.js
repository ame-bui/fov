console.log("Hello");

const data = "https://fragments.codepanel.in/json/fragments";
async function getFragments() {
  const response = await fetch(data);
  const archive = await response.json();
  let div = document.querySelector(".container");

  /// ADDING FRAGMENT
  for (item of archive) {
    let frame = document.createElement("div");

    const img_url = item.field_image_upload;

    const fragment = document.createElement("img"),
      titl = document.createElement("p"),
      desc = document.createElement("p"),
      location = document.createElement("p"),
      time = document.createElement("p"),
      info = document.createElement("span"),
      unit = document.createElement("div");

    fragment.src = "https://fragments.codepanel.in/" + img_url;
    fragment.width = "150";

    titl.innerHTML = item.title;

    fragment.classList.add("fragment");
    frame.classList.add("frame");
    unit.classList.add("frag-box");
    info.classList.add("frag-info");
    titl.classList.add("frag-title");
    desc.classList.add("description");

    frame.append(unit);
    unit.append(fragment);
    frame.append(info);
    info.append(titl);

    if (item.body && item.body.length > 0) {
      desc.innerHTML = item.body;
      info.append(desc);
    }
    //// LOCATION
    if (item.field_location && item.field_location.length > 0) {
      location.innerHTML = "Địa điểm / Location: " + item.field_location;
      location.classList.add("loc-info");
      info.append(location);
    }

    //// TIME
    if (item.created && item.created.length > 0) {
      time.innerHTML = "Ngày đăng tải: " + item.created;
      time.classList.add("description");

      info.append(time);
    }

    setPositionRandomly(frame);

    if (item.field_tags_export && item.field_tags_export.length > 0) {
      // const tags = item.field_tags_export;
      // info.append(tags);
      const sanitizedClasses = item.field_tags_export.map(
        (cls) => (cls = "t_" + cls.replace(/\s+/g, "-").toLowerCase())
      );
      // const ol = createList(item.field_tags_export);
      // filter.appendChild(ol);
      frame.classList.add(...sanitizedClasses);
    }

    $(".frame").draggable();

    div.append(frame);
  }
}

const tagsData = "https://fragments.codepanel.in/json/tags";
async function getTags() {
  const response = await fetch(tagsData);
  const tagarchive = await response.json();
  // console.log(tagarchive);

  let filter = document.querySelector(".filter");
  const filterList = document.createElement("ol");

  for (item of tagarchive) {
    console.log(item.name);
    const li = document.createElement("li");
    li.setAttribute(
      "data-tag",
      ".t_" + item.name.replace(/\s+/g, "-").toLowerCase()
    );
    li.textContent = item.name;
    filterList.appendChild(li);
  }

  filter.appendChild(filterList);
}

function setPositionRandomly(element) {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const randomX = 50 + Math.floor(Math.random() * (screenWidth - 300)); // Adjust for element width
  const randomY = 50 + Math.floor(Math.random() * (screenHeight - 100)); // Adjust for element height

  element.style.position = "absolute";
  element.style.left = `${randomX}px`;
  element.style.top = `${randomY}px`;
}

function createList(items) {
  const ol = items.forEach((item) => {
    const li = document.createElement("li");
    li.setAttribute(
      "data-tag",
      ".t_" + item.replace(/\s+/g, "-").toLowerCase()
    );
    li.textContent = item;
    ol.appendChild(li);
  });

  return ol;
}

getFragments()
  .then((response) => {
    console.log("Finish");
  })
  .catch((error) => {
    console.log("error!");
    console.error(error);
  });

getTags()
  .then((response) => {
    console.log("Finish");
  })
  .catch((error) => {
    console.log("error!");
    console.error(error);
  });

// setInterval(getFragments, 10000);

$(document).on("click", ".filter li", function () {
  selectedClass = $(this).data("tag");
  $(".frame").addClass("hide");
  // alert(selectedClass);
  $(selectedClass).removeClass("hide");
});

$(function () {
  $(document).on("click", ".frame", function (e) {
    $(".frame").removeClass("active");
    $(this).addClass("active");
    $(".fragment").removeClass("expand-img");
    $(".frag-info").removeClass("show-info");
    $(".fragment", this).addClass("expand-img");
    $(".frag-info", this).addClass("show-info");
    e.stopPropagation();
  });

  // $(document).on("click", function (e) {
  //   if ($(e.target).is(".active") == false) {
  //     $(".frame").removeClass("active");
  //     $(".fragment").removeClass("expand-img");
  //     $(".frag-info").removeClass("show-info");
  //   }
  // });
});
