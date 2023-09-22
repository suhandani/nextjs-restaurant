//   let newObject: { [key: string]: any } = {};

  //   order.forEach((ord) => {
  //     if (ord.tableId) {
  //       newObject = {
  //         ...newObject,
  //         [ord.tableId]:
  //           newObject[ord.tableId] == undefined
  //             ? [ord]
  //             : [...newObject[ord.tableId], ord],
  //       };
  //     }
  //   });
  //   const objKey = Object.keys(newObject);
  //   console.log(objKey);
  //   for (let key of objKey) {
  //     newObject[key].forEach((val: string) => {
  //       console.log(val);
  //     });
  //   }

  // let table: number[] = [];
  //   let flag = true;
  // let flag = 0;

  //   order.forEach((ord) => {
  //     if (table.length == 0) {
  //       table = [ord.tableId];
  //     } else {
  //       for (let i = 0; i < table.length; i++) {
  //         if (flag) {
  //           if (table[i] == ord.tableId) {
  //             table[table.length] = ord.tableId;
  //             flag = false;
  //           }
  //         }
  //       }
  //     }
  //     flag = true;
  //   });
  // order.forEach((ord) => {
  //   if (table.length == 0) {
  //     table = [ord.tableId];
  //   } else {
  //     for (let i = 0; i < table.length; i++) {
  //       for (let z = 0; z < table.length; z++) {
  //         if (table[z] == ord.tableId) {
  //           flag++;
  //         }
  //       }
  //       if (flag == 0) {
  //         table[table.length] = ord.tableId;
  //       }
  //       flag = 0;
  //     }
  //   }
  // });

  // console.log(table);

export const getListTable = (order: any[]) => {
    let table: number[] = [];
    let flag = 0;
    order.forEach((ord) => {
    if (table.length == 0) {
      table = [ord.tableId];
    } else {
      for (let i = 0; i < table.length; i++) {
        for (let z = 0; z < table.length; z++) {
          if (table[z] == ord.tableId) {
            flag++;
          }
        }
        if (flag == 0) {
          table[table.length] = ord.tableId;
        }
        flag = 0;
      }
    }
  });
  return table.sort();
}