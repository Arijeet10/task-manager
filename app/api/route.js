import { ConnectMongoDB } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Tassk from "@/libs/models/TaskModel";

//exporting OPTIONS async function in routes handler 
export async function OPTIONS(request) {
    const allowedOrigin = request.headers.get("origin");
    const response = new NextResponse(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": allowedOrigin || "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
        "Access-Control-Max-Age": "86400",
      },
    });
  
    return response;
  }

//POST API to add task
export async function POST(req){
    try {
        const body=await req.json();
        if(!body){
            return new NextResponse.json("Request is INVALID");
        }
        const {title,description,priority,category}=body;
        await ConnectMongoDB();
        const newTask=await new Tassk({
            title,
            description,
            priority,
            category
        });
        console.log(newTask);
        await newTask.save();//add the task in database
        return new NextResponse.json({message:"Task added to database"},{status:201})
    } catch (error) {
        return new NextResponse.json({message:"Error in adding data:",error},{status:500});
    }
}

//GET API to get the task data
export async function GET(){
    try {
        await ConnectMongoDB();
        const tasks=await Tassk.find();//get all task data
        return new NextResponse.json({tasks});

    } catch (error) {
        return new NextResponse(JSON.stringify({message:"Error in getting task data:",error}),{status:500});
    }
}

//PATCH API to update the task data according to category and priority
export async function PATCH(req){
    try {
        const body=await req.json();
        const {_id,title,description,priority,category}=body;
        if(!body){
            return new NextResponse(JSON.stringify({message:"Data is INVALID"}),{status:404});
        }
        await ConnectMongoDB();
        const task=await Tassk.findById(_id);//find the task using id
        if(!task){
            return new NextResponse(JSON.stringify({message:"Task not found in database"}),{status:404});
        }
        if(priority==""||category==""){
            return new NextResponse(JSON.stringify({message:"No data given for updation"}),{status:404});
        }
        //update the task
        if(!title && !description){
            //for assigning priority and category
            const updatedTask=await Tassk.findByIdAndUpdate(
                _id,
                {priority,category},
                {new:true},
            )
        }else{
            //for updating all task data
            if(!title && description){
                //change description if no title
                const updatedTask=await Tassk.findByIdAndUpdate(
                    _id,
                    {description,priority,category},
                    {new:true},
                )
            }else if(title && !description){
                //change title if no description
                const updatedTask=await Tassk.findByIdAndUpdate(
                    _id,
                    {title,priority,category},
                    {new:true},
                )
            }else{
                //change both title and description
                const updatedTask=await Tassk.findByIdAndUpdate(
                    _id,
                    {title,description,priority,category},
                    {new:true},
                )
            }

        }
        
        return new NextResponse(JSON.stringify({message:"Task Updated",task:updatedTask}),{status:201})
    } catch (error) {
        return new NextResponse(JSON.stringify({message:"Error in updating task data:",error}),{status:500})
    }
}

//DELETE API to remove the task
export async function DELETE(req){
    try {
        const body=await req.json();
        if(!body){
            return new NextResponse(JSON.stringify({message:"ID is invalid"}),{status:404})
        }
        await ConnectMongoDB();
        const task=await Tassk.findById(body);//check if task is in database or not
        if(!task){
            return new NextResponse(JSON.stringify({message:"No Task Detected"}),{status:404});
        }

        await Tassk.findByIdAndDelete(body);//delete the task
        console.log("Deleted",task);
        return new NextResponse(JSON.stringify({message:"Task Deleted"}),{status:201});
        
    } catch (error) {
        return new NextResponse(JSON.stringify({message:"Error in deleting task",error}),{status:500})
    }
}






