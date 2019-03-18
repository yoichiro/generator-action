package <%= packageName %>;

import com.google.actions.api.ActionRequest;
import com.google.actions.api.ActionResponse;
import com.google.actions.api.DialogflowApp;
import com.google.actions.api.ForIntent;
import com.google.actions.api.response.ResponseBuilder;

public class FulfillmentApp extends DialogflowApp {

    @ForIntent("Default Welcome Intent")
    public ActionResponse welcome(ActionRequest request) {
        ResponseBuilder builder = getResponseBuilder(request);
        builder.add("Hello, world!");
        return builder.build();
    }

}