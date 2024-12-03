// Get DOM Element


// Update file input lable with selected filenames
fileInput.addEventListener("change" , ()=>{
    const selectedFiles = fileInput.files;
    if (selectedFiles.length >0) {
        const filenames = Array.from(selectedFiles).map((file)=> file.name).join(",");
        const lable = document.querySelector(".custom-file-lab");
        lable.innerHTML = filenames;
    }
})

// Event listener for upload button
uploadButton.addEventListener("click",async()=>{
    const file =fileInput.files[0];
    if (file) {
        try {
             const formData = new FormData();
             formData.append("file" ,file);

             //show loading state
            uploadButton.disabled = true;
            uploadButton.textContent= "Sharing..."

            const response = await fetch("https://file.io/?expires=1d",{
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                const link = `<p>Download file<a href="${data.link}" target="_blank">${data.link}</a></p>`;
                shareableLink.innerHTML = link;
            }else{
                shareableLink.innerHTML = "File share failed.. please try again.";
            }   
        } catch (error) {
           shareableLink.textContent = "An error occured. please try again..";
           console.error("Error sharing file" ,error);
        }finally{
              uploadButton.disabled= "false";
              uploadButton.textContent= "share";
        }
    }else{
        shareableLink.textContent =  "Please upload a file to share";
    }
});
