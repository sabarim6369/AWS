const Lead = require("../schema/leadschema");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../schema/Adminschema');
const mongoose = require('mongoose');
const {getDatabaseConnection} = require('../config/db'); 
const telecallerschema=require("../schema/telecallerschema");
const login = async (req, res) => {
    const { email, password } = req.body;
console.log(req.body)
    if (!email || !password) {
        return res.status(400).json({ message: "Please provide email and password." });
    }

    try {
        
    // const dbLink = process.env.MONGODB_URI.replace('<Database>', "superadmin");
    
        const Admin = req.db.model('Admin');
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(401).json({ message: "Admin not found." });
        }
        console.log(admin.telecallers.length)

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        const databaseName = admin.databaseName;

       console.log("dd",databaseName)

        const token = jwt.sign({ adminId: admin._id, databaseName ,role:"admin"}, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: "Login successful", token,admindetails:admin});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error logging in", error: err });
    }
    };
    const getadmindetails = async (req, res) => {
        try {
            const Telecaller = req.db.model("Telecaller");
            const Lead = req.db.model("Lead");
    
            const telecallers = await Telecaller.find().populate("leads", "status");
    
            const leadCount = await Lead.countDocuments();
    
            const telecallerStats = telecallers.map(tc => {
                const fulfilledLeadsCount = tc.leads.filter(lead => lead.status === "fulfilled").length;
                return {
                    telecaller: tc,
                    fulfilledLeadsCount
                };
            });
    
            telecallerStats.sort((a, b) => b.fulfilledLeadsCount - a.fulfilledLeadsCount);
    
            const topTelecallers = telecallerStats.slice(0, 3).map((tc) => ({
              _id: tc.telecaller._id,
              username: tc.telecaller.username,
              fulfilledLeadsCount: tc.fulfilledLeadsCount,
              status: tc.telecaller.status,
              pending: tc.telecaller.pending,
              address: tc.telecaller.address,
              email: tc.telecaller.email,
              leads: tc.telecaller.leads.length,
            }));
    console.log(topTelecallers)
            res.status(200).json({
              message: "Successfully fetched",
              leadCount,
              telecallers, 
              topTelecallers, 
              success: true,
            });
    
        } catch (error) {
            console.error("Error fetching telecallers:", error);
            res.status(500).json({ message: "Server error", success: false });
        }
    };
    
const getalltelecaller = async (req, res) => {
    try {
        const Telecaller = req.db.model("Telecaller");

        const alltelecallers = await Telecaller.find({ status: "active" })
            .populate({
                path: "leads", 
                select: "name mobilenumber status",
            });

        if (alltelecallers.length === 0) {
            return res.status(400).json({ message: "Telecaller list is empty." });
        }

        return res.status(200).json({ 
            message: "Telecallers fetched successfully", 
            alltelecallers 
        });

    } catch (error) {
        console.error("Error fetching telecallers:", error);
        return res.status(500).json({ message: "Failed to fetch telecallers.", error: error.message });
    }
};


const getallleads=async(req,res)=>{
    const leads = req.db.model("Lead");
const allleads=await leads.find().populate("assignedTo","username email number");
if(!allleads){
    return res.status(400).json({message:"leads list is empty."})
}
return res.status(200).json({message:"leads fetched successfully",allleads})

}

const addtelecaller = async (req, res) => {
    try {
        const { email, password, username, number, address, adminId } = req.body;

        if (!email || !password || !username || !number || !adminId) {
            return res.status(401).json({ message: "Please provide all required fields." });
        }

        const Telecaller = req.db.model("Telecaller");

        // Check if the telecaller already exists
        const existingTelecaller = await Telecaller.findOne({ email });
        if (existingTelecaller) {
            return res.status(402).json({ message: "Telecaller with this email already exists." });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new telecaller
        const newTelecaller = new Telecaller({
            email,
            password: hashedPassword,
            username,
            number,
            address,
            admin: adminId,
            leads: [],
            history: [],
        });

        await newTelecaller.save();

        console.log("✅ Telecaller added successfully.");

        const superAdminDbURI = process.env.MONGODB_SUPERADMINURI;

        const superAdminConnection = await mongoose.createConnection(superAdminDbURI);

        console.log("✅ Connected successfully to SuperAdmin DB.");

       const AdminModel = superAdminConnection.model("Admin", require("../schema/Adminschema"));

        const updatedAdmin = await AdminModel.findByIdAndUpdate(
            adminId,
            { $addToSet: { telecallers: { email } } },
            { new: true }
        );

        if (!updatedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        console.log("✅ Telecaller mapped to Admin successfully.");

        res.status(200).json({ message: "Telecaller added and mapped successfully.", data: newTelecaller });

    } catch (err) {
        console.error("❌ Error adding telecaller:", err);
        res.status(500).json({ message: "Error adding telecaller", error: err.message });
    }
};




const updatetelecaller = async (req, res) => {
    try {
        const { telecallerId } = req.params;
        const { email, password, username, number, status } = req.body;

        if (!email && !password && !username && !number && !status) {
            return res.status(400).json({ message: "Please provide at least one field to update." });
        }

        const telecaller = await Telecaller.findById(telecallerId);
        if (!telecaller) {
            return res.status(404).json({ message: "Telecaller not found." });
        }

        if (email) telecaller.email = email;
        if (password) telecaller.password = await bcrypt.hash(password, 10);
        if (username) telecaller.username = username;
        if (number) telecaller.number = number;
        if (status) telecaller.status = status;

        await telecaller.save();
        res.status(200).json({ message: "Telecaller updated successfully", data: telecaller });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating telecaller", error: err });
    }
};

const deletetelecaller = async (req, res) => {
    try {
        const { telecallerId } = req.params;

        const telecaller = await Telecaller.findById(telecallerId);
        if (!telecaller) {  
            return res.status(404).json({ message: "Telecaller not found." });
        }

        await Telecaller.findByIdAndDelete(telecallerId);
        res.status(200).json({ message: "Telecaller deleted successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting telecaller", error: err });
    }
};
const assignleads = async (req, res) => {
    try {
        const { telecallerId, leadId } = req.body; 
        console.log("Assigning single lead:", req.body);

        if (!telecallerId || !leadId) {

            return res.status(400).json({ message: "Please provide telecaller ID and lead ID." });
        }

        const Telecaller = req.db.model("Telecaller");
        const Lead = req.db.model("Lead");

        const telecaller = await Telecaller.findById(telecallerId);
        if (!telecaller) {
            return res.status(404).json({ message: "Telecaller not found." });
        }

        const lead = await Lead.findById(leadId);
        if (!lead) {
            return res.status(404).json({ message: "Lead not found." });
        }
        if (lead.status !== "unassigned") {
            const populatedLead = await Lead.findById(leadId).populate("assignedTo", "username");
        
            const assignedTelecallers = populatedLead.assignedTo.map(tc => tc.username).join(", ");
        
            console.log(assignedTelecallers);
            return res.status(400).json({ message: `Lead is already assigned to: ${assignedTelecallers}` });
        }
        
        if (lead.assignedTo.includes(telecaller._id)) {
            console.log("dddddddddddddddddd")

            return res.status(400).json({ message: "Lead is already assigned to this telecaller." });
        }

        telecaller.leads.push(lead._id);
        telecaller.pending += 1; 
        await telecaller.save();

        lead.assignedTo.push(telecaller._id);
        lead.status = "assigned"; 
        await lead.save();

        res.status(200).json({ message: "Lead assigned successfully." });
    } catch (err) {
        console.error("Error assigning lead:", err);
        res.status(500).json({ message: "Error assigning lead", error: err.message });
    }
};
const swapleads = async (req, res) => {
    console.log("Starting lead redistribution process...");

    const Leads = req.db.model("Lead");
    const Telecallers = req.db.model("Telecaller");

    try {
        // Fetch all active telecallers
        const activeTelecallers = await Telecallers.find({ status: 'active' });

        if (activeTelecallers.length === 0) {
            return res.status(400).json({ message: "No active telecallers available." });
        }

        // Fetch all leads (from all telecallers)
        const allLeads = await Leads.find();

        if (allLeads.length === 0) {
            return res.status(400).json({ message: "No leads to redistribute." });
        }

        console.log(`Total Leads to Redistribute: ${allLeads.length}`);

        // Unassign all leads from everyone
        await Leads.updateMany(
            {},
            { $set: { assignedTo: [] } }
        );

        // Reset pending leads and leads array for all telecallers
        await Telecallers.updateMany(
            {},
            { $set: { pending: 0, leads: [] } }
        );

        // Redistribute all leads among active telecallers
        const totalLeads = allLeads.length;
        const telecallerCount = activeTelecallers.length;
        const baseLeadsPerTelecaller = Math.floor(totalLeads / telecallerCount);
        let extraLeads = totalLeads % telecallerCount;

        // Sort telecallers to prioritize those with fewer leads (though all are 0 now)
        activeTelecallers.sort((a, b) => a.pending - b.pending);

        let leadIndex = 0;

        for (let i = 0; i < activeTelecallers.length; i++) {
            const telecaller = activeTelecallers[i];
            const numLeads = baseLeadsPerTelecaller + (extraLeads > 0 ? 1 : 0);
            extraLeads = Math.max(extraLeads - 1, 0);

            if (numLeads > 0) {
                const leadsChunk = allLeads.slice(leadIndex, leadIndex + numLeads);
                leadIndex += numLeads;
                const leadIds = leadsChunk.map(lead => lead._id);

                // Assign leads to the current telecaller
                await Leads.updateMany(
                    { _id: { $in: leadIds } },
                    { $set: { assignedTo: [telecaller._id], status: 'assigned' } }
                );

                // Update telecaller's leads and pending count
                await Telecallers.updateOne(
                    { _id: telecaller._id },
                    {
                        $push: { leads: { $each: leadIds } },
                        $inc: { pending: numLeads }
                    }
                );
            }
        }

        res.status(200).json({ message: "All leads redistributed equally among active telecallers." });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Failed to redistribute leads.", error: error.message });
    }
};
const addleads = async (req, res) => {
    try {
        console.log(req.body);
        const { leadsData, adminid } = req.body;

        if (!Array.isArray(leadsData) || leadsData.length === 0) {
            return res.status(400).json({ message: "No data provided or invalid format." });
        }

        const leads = leadsData.map((lead) => ({
            name: `${lead['First Name']} ${lead['Last Name']}`,
            mobilenumber: lead.Id,
            address: lead.Country || "",
            gender: lead.Gender || "",
            country: lead.Country || "",
            age: lead.Age || null,
            date: lead.Date || "",
            id: lead.Id || null,
        }));

        console.log("Processing leads...");

        const Leads = req.db.model("Lead");
        const result = await Leads.insertMany(leads);

        console.log("Leads inserted successfully:", result.length);

        const superAdminDbURI = process.env.MONGODB_SUPERADMINURI;
        const superAdminConnection = await mongoose.createConnection(superAdminDbURI).asPromise();
        console.log("Connected successfully to SuperAdmin DB");

        const AdminModel = superAdminConnection.model("Admin", require("../schema/Adminschema"));

        const updatedAdmin = await AdminModel.updateOne(
            { _id: adminid },
            { $inc: { leads: result.length } }
        );

        console.log("Updated Admin leads count:", updatedAdmin);

        res.status(201).json({
            message: "Leads uploaded successfully",
            totalLeadsInserted: result.length,
            adminUpdateStatus: updatedAdmin
        });

    } catch (err) {
        console.error("Error uploading leads:", err);
        res.status(500).json({ message: "Error uploading leads", error: err.message });
    }
};

const assignallleads = async (req, res) => {
    console.log("Before fetching unassigned leads");

    const Leads = req.db.model("Lead");
    const Telecallers = req.db.model("Telecaller");

    try {
        const unassignedLeads = await Leads.find({ status: 'unassigned' });
        console.log("Unassigned leads:", unassignedLeads.length);

        if (unassignedLeads.length === 0) {
            return res.status(400).json({ message: "No unassigned leads to assign." });
        }

        const telecallers = await Telecallers.find({ status: 'active' });
        console.log("Active telecallers:", telecallers.length);

        if (telecallers.length === 0) {
            return res.status(400).json({ message: "No active telecallers available." });
        }

        let newTelecallers = telecallers.filter(tc => tc.leads.length === 0);
        let experiencedTelecallers = telecallers.filter(tc => tc.leads.length > 0);

        console.log("New Telecallers:", newTelecallers.length);
        console.log("Experienced Telecallers:", experiencedTelecallers.length);

        let leadIndex = 0;

        if (newTelecallers.length > 0) {
            const baseTarget = Math.floor(unassignedLeads.length / newTelecallers.length);
            let remainder = unassignedLeads.length % newTelecallers.length;

            for (let i = 0; i < newTelecallers.length; i++) {
                const telecaller = newTelecallers[i];
                let target = baseTarget + (remainder > 0 ? 1 : 0);
                remainder = Math.max(remainder - 1, 0);

                if (target <= 0) continue;

                const assignedLeads = unassignedLeads.slice(leadIndex, leadIndex + target);
                leadIndex += target;

                if (assignedLeads.length > 0) {
                    const leadIds = assignedLeads.map(lead => lead._id);

                    await Leads.updateMany(
                        { _id: { $in: leadIds } },
                        {
                            $push: { assignedTo: telecaller._id },
                            $set: { status: 'assigned' }
                        }
                    );

                    await Telecallers.updateOne(
                        { _id: telecaller._id },
                        { 
                            $push: { leads: { $each: leadIds } },
                            $inc: { pending: target } 
                        }
                    );
                }
            }
        }

        if (leadIndex < unassignedLeads.length && experiencedTelecallers.length > 0) {
            console.log("Distributing remaining leads to experienced telecallers");

            experiencedTelecallers.sort((a, b) => a.pending - b.pending);

            let remainingLeads = unassignedLeads.slice(leadIndex);
            let remainingIndex = 0;

            for (let i = 0; i < remainingLeads.length; i++) {
                const lead = remainingLeads[i];
                const telecaller = experiencedTelecallers[remainingIndex];

                await Leads.updateOne(
                    { _id: lead._id },
                    {
                        $push: { assignedTo: telecaller._id },
                        $set: { status: 'assigned' }
                    }
                );

                await Telecallers.updateOne(
                    { _id: telecaller._id },
                    { 
                        $push: { leads: lead._id },
                        $inc: { pending: 1 }
                    }
                );

                remainingIndex = (remainingIndex + 1) % experiencedTelecallers.length;
            }
        }

        res.status(200).json({ message: "Leads assigned successfully." });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Failed to assign leads.", error: error.message });
    }
};
const getstats = async (req, res) => {
    console.log("👏👏👏👏👏😍😍😍");
    try {
        const today = new Date().toISOString().split("T")[0];
        const Telecaller = req.db.model("Telecaller");

        const telecallers = await Telecaller.find().populate("history.leadId");

        if (!telecallers || telecallers.length === 0) {
            return res.status(404).json({ message: "No telecallers found." });
        }

        let totalCalls = 0;
        let answeredCalls = 0;
        let notAnsweredCalls = 0;
        let confirmed = 0;

        let telecallerStats = [];

        telecallers.forEach(telecaller => {
            let todayStats = { totalcalls: 0, answeredcalls: 0, notansweredcalls: 0, confirmed: 0 };

            if (telecaller.dailyStats && telecaller.dailyStats.length > 0) {
                const foundStats = telecaller.dailyStats.find(stat => stat.date === today);
                if (foundStats) {
                    todayStats = foundStats;
                }
            }

            totalCalls += todayStats.totalcalls || 0;
            answeredCalls += todayStats.answeredcalls || 0;
            notAnsweredCalls += todayStats.notansweredcalls || 0;
            confirmed += todayStats.confirmed || 0;

            telecallerStats.push({
                id: telecaller._id,
                username: telecaller.username,
                email: telecaller.email,
                totalCalls: todayStats.totalcalls || 0,
                confirmedCalls: todayStats.confirmed || 0
            });
        });

        // Sort by total calls, then by confirmed calls
        telecallerStats.sort((a, b) => b.totalCalls - a.totalCalls || b.confirmedCalls - a.confirmedCalls);

        // Get top 10 telecallers
        const topTelecallers = telecallerStats.slice(0, 10);

        console.log("Today's Total Stats:", { totalCalls, answeredCalls, notAnsweredCalls, confirmed });
console.log(topTelecallers)
        res.status(200).json({ 
            totalCalls, 
            answeredCalls, 
            notAnsweredCalls, 
            confirmed,
            topTelecallers
        });

    } catch (err) {
        console.error("Error fetching telecaller history:", err);
        res.status(500).json({ message: "Error fetching telecaller history.", error: err });
    }
};







module.exports = {
    addtelecaller,
    updatetelecaller,
    deletetelecaller,
    assignleads,
    swapleads,
    addleads,
    login,
    getalltelecaller,
    getallleads,
    assignallleads,
    getadmindetails,
    getstats
};
