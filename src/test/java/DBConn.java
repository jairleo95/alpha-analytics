
import java.sql.*;

public class DBConn {

    public static void main(String[] args) throws ClassNotFoundException {
        try {
            String username = "root";
            String password = "";
            String url = "jdbc:mysql://192.168.1.6:3306/alpha_analytics?connectTimeout=3000";

            Class.forName("com.mysql.jdbc.Driver");
            Connection conn = DriverManager.getConnection(url, username, password);

            Statement st = conn.createStatement();
            ResultSet rs = st.executeQuery("SELECT TABLE_NAME, 0 FROM INFORMATION_SCHEMA.tables WHERE TABLE_SCHEMA='alpha_analytics'");
            rs.next();
            System.out.println(rs.getString(1));
            
            //  return conn;
            // Do something with the Connection
            System.out.print("success!");
        } catch (SQLException ex) {
            // handle any errors
            System.out.println("SQLException: " + ex.getMessage());
            System.out.println("SQLState: " + ex.getSQLState());
            System.out.println("VendorError: " + ex.getErrorCode());
        }

    }
}
