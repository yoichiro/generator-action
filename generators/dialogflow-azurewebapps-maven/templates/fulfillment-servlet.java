package <%= packageName %>;

import com.google.actions.api.App;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@WebServlet(name = "FulfillmentServlet", urlPatterns = {"/"}, loadOnStartup = 1)
public class FulfillmentServlet extends HttpServlet {

    private App app = new FulfillmentApp();

    @Override
    protected void doPost(
            HttpServletRequest req, HttpServletResponse resp)
            throws IOException {
        String requestBody =
            req.getReader().lines().collect(Collectors.joining());
        Map<String, String> headersMap =
            Collections.list(req.getHeaderNames())
                .stream()
                .collect(Collectors.toMap(
                    name -> name,
                    req::getHeader));
        try {
            String responseBody =
                app.handleRequest(requestBody, headersMap).get();
            resp.setContentType("application/json; charset=utf-8");
            resp.getWriter().write(responseBody);
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
            resp.setStatus(
                HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write(e.getMessage());
        }
    }

}