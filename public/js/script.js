$("#comment").click(function (e) {
    e.preventDefault();
    // write your code
    console.log("test")

    console.log($("textarea#commentArea").val())

    // var duration;
    // var startTime;

    var userData = {
        comment: $("textarea#commentArea").val(),
        // duration: duration,
        // startTime: startTime
    }

    $.post(
        "/submit", userData,
        function (data) {
            console.log("data ----- ", data);

            output = $(".output");

            var rduration = data.duration.amount + " " + data.duration.unit;
            console.log("result of duaration ----- " + rduration);
            // rduration.append(duration);
            var rstartTime = data.startTime;
            console.log("result statrt time ------ " + rstartTime);
            // rstartTime.append(startTime);

            var cList = $('ul.mylist')
            cList.empty();
            $('<li/>')
                .text("Duration: " + data.duration.amount + " " + data.duration.unit)
                .appendTo(cList);
            $('<li/>')
                .text("Goal: " + data.goal)
                .appendTo(cList);
            $('<li/>')
                .text("Start Time: " + data.startTime)
                .appendTo(cList);


            //var comments = data.comments
            //outputComment(comments)
        });
});