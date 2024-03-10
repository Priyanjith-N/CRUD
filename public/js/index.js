$("#add_user").submit(function (event) {
  event.preventDefault();

  const unindexed_array = $(this).serializeArray();

  const request = {
    url: `http://localhost:7000/api/addUser`,
    method: "POST",
    data: unindexed_array,
  };

  $.ajax(request)
    .then((res) => {
      alert("New User Added");
      window.location.href = res;
    })
    .catch((err) => {
      window.location.href = err.responseText;
    });
});



$("#update_user").submit(function (event) {
  event.preventDefault();

  const unindexed_array = $(this).serializeArray();

  const data = {};

  //   $.map(unindexed_array, function (n, i) {
  //     data[n["name"]] = n["value"]; // also do like this
  //   });

  console.log(unindexed_array);
  const request = {
    url: `http://localhost:7000/api/updateUser/${unindexed_array[0].value}`, // change to data.id
    method: "PUT",
    data: unindexed_array, // if you do like above change to data
  };

  $.ajax(request)
    .then((res) => {
      alert(res);
      window.location.href = "/adminHome";
    })
    .catch((err) => {
      alert(err.responseText);
    });
});


if(window.location.pathname === '/adminHome'){
    $ondelete = $('.table tbody td .delete');
    $ondelete.click(function() {
        const id = $(this).attr("data-id");

        const request = {
            url: `http://localhost:7000/api/deleteUser/${id}`,
            method: "DELETE"
        }

        if(confirm('Do you really want to delete this record?')){
            $.ajax(request)
            .then(res => {
                alert(res);
                window.location.reload();
            })
            .catch(err => {
                alert(err.responseText);
                window.location.reload();
            });
        }
    })
}

$(document).ready(function() {
  $('#name-search').on('keyup', function() {
    const searchText = $(this).val().toLowerCase();

    $('table tbody tr').each(function() {
      const id = $(this).find('td:eq(0)').text().toLowerCase();
      const userName = $(this).find('td:eq(1)').text().toLowerCase();
      const email = $(this).find('td:eq(2)').text().toLowerCase();

      if(id.includes(searchText)){
        $(this).show();
      }else if(userName.includes(searchText)){
        $(this).show();
      }else if(email.includes(searchText)){
        $(this).show();
      }else{
        $(this).hide();
      }
    })
  })
})