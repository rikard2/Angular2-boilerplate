using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Cors;

namespace WebApi
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();
            config.Formatters.Add(new BrowserJsonFormatter());

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/service/single/{serviceName}",
                defaults: new { name = RouteParameter.Optional, controller = "Service", action = "Single" }
            );

            config.Routes.MapHttpRoute(
                name: "DefaultApi23",
                routeTemplate: "api/service/list/{serviceName}",
                defaults: new { name = RouteParameter.Optional, controller = "Service", action = "List" }
            );

            config.Routes.MapHttpRoute(
                name: "DefaultApiSave",
                routeTemplate: "api/service/save/{serviceName}",
                defaults: new { name = RouteParameter.Optional, controller = "Service", action = "Save" }
            );

            config.Routes.MapHttpRoute(
                name: "DefaultApi2",
                routeTemplate: "api/hello/{namez}",
                defaults: new { name = RouteParameter.Optional, controller = "Service", action = "Hello" }
            );
            
            var cors = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(cors);
        }
    }

    public class BrowserJsonFormatter : JsonMediaTypeFormatter
    {
        public BrowserJsonFormatter()
        {
            this.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));
            this.SerializerSettings.Formatting = Formatting.Indented;
        }

        public override void SetDefaultContentHeaders(Type type, HttpContentHeaders headers, MediaTypeHeaderValue mediaType)
        {
            base.SetDefaultContentHeaders(type, headers, mediaType);
            headers.ContentType = new MediaTypeHeaderValue("application/json");
        }
    }
}
