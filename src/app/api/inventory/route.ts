import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();



// Function to add an inventory item (only for admins)
async function addInventoryItem(userId: string, itemData: any,categorySpecificData: any) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  if (!user || user.role !== 'admin') {
    return { success: false, message: 'Permission denied: Only admins can add inventory items.' };
  }

 
 // Create the inventory item
 const newItem = await prisma.inventoryItem.create({
  data: {
    itemId: itemData.itemId,
    category: itemData.category,
    type: itemData.type,
    description: itemData.description || null,
    quantity: itemData.quantity || 1,
    location: itemData.location || null,
    condition: itemData.condition || 'new',
    acquisitionDate: itemData.acquisitionDate ? new Date(itemData.acquisitionDate) : null,
    expiryDate: itemData.expiryDate ? new Date(itemData.expiryDate) : null,
    price: itemData.price || null,
    supplier: itemData.supplier || null,
    assignedTo: itemData.assignedTo || null,
    returnDate: itemData.returnDate || null,
    lastInspectionDate: itemData.lastInspectionDate
      ? new Date(itemData.lastInspectionDate)
      : null,
    maintenanceSchedule: itemData.maintenanceSchedule || null,
    maintenanceCharge: itemData.maintenanceCharge || null,
    issuedTo: itemData.issuedTo || null,
    userId: userId,
  },
});


// Insert into category-specific table
let categoryResponse;
switch (itemData.category) {
  case 'COMMUNICATION_DEVICES':
    categoryResponse = await prisma.communicationDevice.create({
      data: {
        inventoryItemId: newItem.itemId,
        frequencyRange: categorySpecificData.frequencyRange || null,
        batteryType: categorySpecificData.batteryType || null,
        connectivity: categorySpecificData.connectivity || null,
      },
    });
    break;

  case 'COMPUTER_AND_IT_EQUIPMENT':
    categoryResponse = await prisma.computerAndITEquipment.create({
      data: {
        inventoryItemId: newItem.itemId,
        processor: categorySpecificData.processor || null,
        RAM: categorySpecificData.ram || null,
        storage: categorySpecificData.storage || null,
        OS: categorySpecificData.os || null,
      },
    });
    break;
    default:
      return NextResponse.json(
        { success: false, message: 'Invalid category or unsupported category.' },
        { status: 400 }
      );
  }
  return { success: true, message: 'Inventory item added successfully.', data: newItem };
}

// Function to update an inventory item (only for admins)
// async function updateInventoryItem(userId: string, itemId: string, itemData: any) {
//   const user = await prisma.user.findUnique({
//     where: { id: userId },
//     select: { role: true },
//   });

//   if (!user || user.role !== 'admin') {
//     return { success: false, message: 'Permission denied: Only admins can update inventory items.' };
//   }

//   const updatedItem = await prisma.inventoryItem.update({
//     where: { itemId: itemId },
//     data: itemData,
//   });

//   return { success: true, message: 'Inventory item updated successfully.', data: updatedItem };
// }

// Function to delete an inventory item (only for admins)
async function deleteInventoryItem(userId: string, itemId: string) {
  const user = await prisma.user.findUnique({
    where: {id: userId },
    select: { role: true },
  });

  if (!user || user.role !== 'admin') {
    return { success: false, message: 'Permission denied: Only admins can delete inventory items.' };
  }


  await prisma.inventoryItem.delete({
    where: { itemId: itemId },
  });

  return { success: true, message: 'Inventory item deleted successfully.' };
}

// POST handler
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, itemData,categorySpecificData } = body;

    if (!userId || !itemData ||!categorySpecificData) {
      return NextResponse.json(
        { success: false, message: 'userId,categorySpecificData and itemData are required.' },
        { status: 400 }
      );
    }

    const response = await addInventoryItem(userId, itemData,categorySpecificData);
    if (!(response instanceof NextResponse)) {
    if (response.success) {
      return NextResponse.json(response, { status: 201 });
    } else {
      return NextResponse.json(response, { status: 400 });
    }
  } }catch (error: any) {
    return NextResponse.json(
      { success: false, message: `Internal server error: ${error.message}` },
      { status: 500 }
    );
  }
}

// // PUT handler (for updating inventory item)
// export async function PUT(req: Request) {
//   try {
//     const body = await req.json();
//     const { userId, itemId, itemData } = body;

//     if (!userId || !itemId || !itemData) {
//       return NextResponse.json(
//         { success: false, message: 'userId, itemId, and itemData are required.' },
//         { status: 400 }
//       );
//     }

//     const response = await updateInventoryItem(userId, itemId, itemData);
    
//     if (response.success) {
//       return NextResponse.json(response, { status: 200 });
//     } else {
//       return NextResponse.json(response, { status: 400 });
//     }
//   } catch (error: any) {
//     return NextResponse.json(
//       { success: false, message: `Internal server error: ${error.message}` },
//       { status: 500 }
//     );
//   }
// }

// DELETE handler (for deleting inventory item)
export async function DELETE(req: Request) {
  try {
    const { userId, itemId } = await req.json();

    if (!userId || !itemId) {
      return NextResponse.json(
        { success: false, message: 'userId and itemId are required.' },
        { status: 400 }
      );
    }

    const response = await deleteInventoryItem(userId, itemId);

    if (response.success) {
      return NextResponse.json(response, { status: 200 });
    } else {
      return NextResponse.json(response, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: `Internal server error: ${error.message}` },
      { status: 500 }
    );
  }
}


export async function PUT(req:Request) {
  try {
    const body = await req.json();
    const { userId,itemId, fieldsToUpdate, childUpdates } = body;
    const user = await prisma.user.findUnique({
          where: { id: userId },
          select: { role: true },
        });
      
        if (!user || user.role !== 'admin') {
          return NextResponse.json({ success: false, message: 'Permission denied: Only admins can update inventory items.' });
        }
        
    if (!itemId || !fieldsToUpdate) {
      return new Response(
        JSON.stringify({ error: 'itemId and fieldsToUpdate are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Build the update object
    const updateData = { ...fieldsToUpdate };

    // Add child updates dynamically if provided
    if (childUpdates) {
      for (const [childTable, updates] of Object.entries(childUpdates)) {
        updateData[childTable] = {
          update: updates, // Assumes `update` action for related records
        };
      }
    }

    // Perform the update
    const updatedItem = await prisma.inventoryItem.update({
      where: { itemId },
      data: updateData,
    });

    return new Response(
      JSON.stringify({ message: 'Item and related data updated successfully', updatedItem }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error:any) {
    console.error('Error updating inventory item and related data:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to update inventory item and related data',
        details: error.message,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}