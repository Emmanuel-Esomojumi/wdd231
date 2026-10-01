const params = new URLSearchParams(window.location.search);


const getValue = (name) => {
    return params.get(name) || "Not provided";
};


const membershipNames = {
    np: "NP Membership",
    bronze: "Bronze Membership",
    silver: "Silver Membership",
    gold: "Gold Membership"
};


const formatMembership = (value) => {
    return membershipNames[value] || "Not provided";
};


const formatTimestamp = (value) => {
    if (!value || value === "Not provided") {
        return "Not provided";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return date.toLocaleString("en-NG", {
        dateStyle: "medium",
        timeStyle: "short"
    });
};


const firstName = getValue("firstName");
const lastName = getValue("lastName");
const orgTitle = getValue("orgTitle");
const email = getValue("email");
const phone = getValue("phone");
const organization = getValue("organization");
const description = getValue("description");
const membership = formatMembership(getValue("membershipLevel"));
const timestamp = formatTimestamp(getValue("timestamp"));


document.querySelector("#outFirstName").textContent = firstName;
document.querySelector("#outLastName").textContent = lastName;
document.querySelector("#outOrgTitle").textContent = orgTitle;
document.querySelector("#outEmail").textContent = email;
document.querySelector("#outPhone").textContent = phone;
document.querySelector("#outOrganization").textContent = organization;
document.querySelector("#outDescription").textContent = description;
document.querySelector("#outMembership").textContent = membership;
document.querySelector("#outTimestamp").textContent = timestamp;