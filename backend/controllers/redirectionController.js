const pool = require("../config/db");
const statusCodeRoutes = require("../routes/statusCodeRoutes");
const getRedirections = async (req, res, next) => {
  // Replace with actual logic to retrieve isStatusCodeEnabled from admin settings
  let isStatusCodeEnabled = true;

  try {
    // If admin route, skip redirection logic and go to next middleware
    if (req.path.startsWith("/admin")) {
      return next();
    }

    // If status code redirection is not enabled, skip redirection logic
    if (!isStatusCodeEnabled) {
      return next();
    }

    const statusCode = req.query.status_code;

    if (statusCode) {
      // Query the database for a specific status code
      const [rows] = await pool.query(
        "SELECT url FROM redirection_status WHERE status_code = ?",
        [statusCode]
      );

      // Redirect if URL is found for status code, otherwise show waiting message
      if (rows.length > 0) {
        return res.redirect(rows[0].url);
      } else {
        return res.json({ message: "Please wait...." });
      }
    } else {
      // If no specific status_code is provided, show all URLs
      const [rows] = await pool.query("SELECT * FROM redirection_status");
      // const urls = rows.map((row, index) => ` ${index + 1} : ${row.url}  ${row.name}`);
      const rowData = Object.values(rows)
      return res.json(rowData);
    }
  } catch (error) {
    console.error("Error in getRedirections:", error);
    res.status(500).json({ error: error.message });
  }
};

const updateRedirection = async (req, res) => {
  const { status_code, id } = req.body;

  try {
    // todo Update the `status_code` of the row with the given `id` 
    const updateResult = await pool.query(
      "UPDATE redirection_status SET status_code = ? WHERE id = ?",
      [status_code, id]
    );

    if(updateResult.affectedRows > 0) {
      //! Fetch the URL to redirect to based on the updated status code
      const [redirectResult] = await pool.query(
        "SELECT url FROM redirection_status WHERE id = ?",
        [id]
      );

      if(redirectResult.length > 0) {
      return res.redirect(redirectResult[0].url);  //? Redirect to the updated URL
      }
    }

    res.json({ message: "Redirection updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getRedirections, updateRedirection };
