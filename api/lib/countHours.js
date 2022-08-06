 function countHours(branches){
 const branchHours=   branches.map((branch) => {
    let branchinfo = { branch: branch.name, hours: 0 };
    branch.workDays.map((workDay) => {
        branchinfo.hours +=
          (new Date(`${workDay.date} ${workDay.wishClosingHour}`) -
            new Date(`${workDay.date} ${workDay.wishEntryHour}`)) /
          1000 /
          60 /
          60;
      });
      return branchinfo;
    });
    const branchWithoutSecurity = branchHours.filter(
        (branch) => branch.hours < 168
      );

      return branchWithoutSecurity
 }

 function freeSecurity(branches){
    const branchWithOutWorkDay = branches.filter(
        (branch) => branch.securities.length === 0
      );
      return branchWithOutWorkDay
 }

 module.exports= {countHours, freeSecurity}
